import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const CustomerList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="phone_number" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default CustomerList;