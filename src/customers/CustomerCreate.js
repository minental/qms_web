import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

const CustomerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="phone_number" validate={[required()]} />
      <TextInput source="first_name" validate={[required()]} />
      <TextInput source="last_name" validate={[required()]} />
    </SimpleForm>
  </Create>
);

export default CustomerCreate;