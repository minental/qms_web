import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import Login from './Login';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import simpleRestProvider from 'ra-data-simple-rest';
import OperatorList from './operators/OperatorList';
import OperatorEdit from './operators/OperatorEdit';
import OperatorCreate from './operators/OperatorCreate';
import CustomerList from './customers/CustomerList';
import CustomerEdit from './customers/CustomerEdit';
import CustomerCreate from './customers/CustomerCreate';
import ServingShow from './serving/ServingShow';
import { API_URL } from './constants';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }
  options.headers.set('Access-Token', localStorage.getItem('token'));
  return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider(API_URL, httpClient);

const App = () => (
  <Admin title="QMS Web" dashboard={Dashboard} loginPage={Login} authProvider={authProvider} dataProvider={dataProvider}>
    {role => {
      if (role === 'admin') {
        return [
          <Resource name="operators" list={OperatorList} edit={OperatorEdit} create={OperatorCreate}/>,
          <Resource name="customers" list={CustomerList} edit={CustomerEdit} create={CustomerCreate}/>
        ]
      } else {
        return [
          <Resource name="serving" list={ServingShow} />
        ]
      }
    }}
  </Admin>
);

export default App;
