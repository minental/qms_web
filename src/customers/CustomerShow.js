import React from 'react';
import { SimpleShowLayout, TextField } from 'react-admin';

const CustomerShow = (props) => (
  <SimpleShowLayout {...props}>
    <TextField source="id" />
    <TextField source="phone_number" />
    <TextField source="first_name" />
    <TextField source="last_name" />
  </SimpleShowLayout>
);

export default CustomerShow;