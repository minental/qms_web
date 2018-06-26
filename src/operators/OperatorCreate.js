import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

const OperatorCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" validate={[required()]} />
      <TextInput source="first_name" validate={[required()]} />
      <TextInput source="last_name" validate={[required()]} />
      <TextInput source="password" type="password" validate={[required()]} />
    </SimpleForm>
  </Create>
);

export default OperatorCreate;