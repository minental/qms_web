import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import { API_SESSIONS_URL } from './constants';

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { email, password } = params;
    const request = new Request(API_SESSIONS_URL, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password }}),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return fetch(request).then(response => {
      return response.json().then(body => ({
        status: response.status,
        token: response.headers.get('Access-Token'),
        body,
      })).then(data => {
        if (data.status < 200 || data.status >= 300) {
          throw new Error(data.body.message);
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.body.role);
      });
    });
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    const token = localStorage.getItem('token');
    if (token) {
      const request = new Request(API_SESSIONS_URL, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Token': token,
        }),
      })
      return fetch(request).then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      });
    }
    return Promise.resolve();
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  }
  return Promise.reject('Unknown method');
};