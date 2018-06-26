import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { API_QUEUE_URL } from './constants';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      queue_data: {}
    };
  }

  componentDidMount() {
    this.loadQueueStatus();
  }

  loadQueueStatus = () => {
    const request = new Request(API_QUEUE_URL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('token'),
      }),
    })
    fetch(request).then(response =>
      response.json()).then(body => {
        this.setState({
          queue_data: body,
        })
      });
  }

  render() {
    const { queue_data } = this.state;
    const customer_servings = queue_data.customer_servings || {};
    const customers = queue_data.customers || [];
    return (
      <Card>
        <CardHeader title="Queue status" />
        <CardContent>
          <Typography type="title" style={{'margin-bottom': '10px'}}>{'Currently processing'}</Typography>
          <Paper>
            <Table>
              <TableRow>
                <TableCell>Operator</TableCell>
                <TableCell>Customer</TableCell>
              </TableRow>
              <TableBody>
                {Object.keys(customer_servings).map(key => (
                  <TableRow key={key}>
                    <TableCell>{`Operator #${key}`}</TableCell>
                    <TableCell>{customer_servings[key] ? `Customer #${customer_servings[key]}` : 'none'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Typography
            type="title"
            style={{'margin': '30px auto 10px'}}
          >
            {'Customers in queue'}
          </Typography>
          <Paper>
            <Table>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
              </TableRow>
              <TableBody>
                {customers.map(customer => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.first_name}</TableCell>
                    <TableCell>{customer.last_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.loadQueueStatus}>
            {'Refresh'}
          </Button>
        </CardActions>
      </Card>
    );
  }
};

export default Dashboard;