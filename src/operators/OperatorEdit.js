import React from 'react';
import { Edit, SimpleForm, TextInput, DisabledInput, required } from 'react-admin';

const OperatorEdit = (props) => (
  <Edit title={<OperatorTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="email" validate={[required()]} />
      <TextInput source="first_name" validate={[required()]} />
      <TextInput source="last_name" validate={[required()]} />
      <TextInput source="password" />
    </SimpleForm>
  </Edit>
);

const OperatorTitle = ({ record }) => {
  return <span>{record ? `${record.first_name} ${record.last_name}` : ''}</span>;
};

export default OperatorEdit;