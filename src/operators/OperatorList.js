import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const OperatorList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default OperatorList;