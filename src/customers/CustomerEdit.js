import React from 'react';
import { Edit, SimpleForm, TextInput, DisabledInput, required } from 'react-admin';

const CustomerEdit = (props) => (
  <Edit title={<CustomerTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="phone_number" validate={[required()]} />
      <TextInput source="first_name" validate={[required()]} />
      <TextInput source="last_name" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

const CustomerTitle = ({ record }) => {
  return <span>{record ? `${record.first_name} ${record.last_name}` : ''}</span>;
};

export default CustomerEdit;