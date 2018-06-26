import React, { Component, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CustomerShow from '../customers/CustomerShow';
import {
  API_SERVING_URL,
  API_SERVING_CLOSE_URL,
  API_SERVING_NEXT_URL,
  API_SERVING_NO_SHOW_URL,
  API_QUEUE_URL,
} from '../constants';

class ServingShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {},
      queueSize: null,
    };
  }

  componentDidMount() {
    this.loadCurrentCustomer();
    this.loadQueueStatus();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.customer !== this.state.customer) {
      this.loadQueueStatus();
    }
  }

  loadCurrentCustomer = () => {
    const request = new Request(API_SERVING_URL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('token'),
      }),
    })
    fetch(request).then(response =>
      response.json()).then(body => {
        this.setState({
          customer: body,
        })
      });
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
          queueSize: body.queue_size,
        })
      });
  }

  handleFinishClick = () => {
    const request = new Request(API_SERVING_CLOSE_URL, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('token'),
      }),
    })
    fetch(request).then(response =>
      response.json()).then(body => {
        this.setState({
          customer: body,
        })
      });
  }

  handleNoShowClick = () => {
    const request = new Request(API_SERVING_NO_SHOW_URL, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('token'),
      }),
    })
    fetch(request).then(response =>
      response.json()).then(body => {
        this.setState({
          customer: body,
        })
      });
  }

  handleNextClick = () => {
    const request = new Request(API_SERVING_NEXT_URL, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('token'),
      }),
    })
    fetch(request).then(response =>
      response.json()).then(body => {
        this.setState({
          customer: body,
        })
      });
  }

  render() {
    return (
      <Card>
        <CardHeader title="Current customer" />
        <CardContent>
          {this.state.customer.id ? 
            <CustomerShow record={this.state.customer}/> :
            <Typography type="content">{'No customer is being processed now'}</Typography>}
            {this.state.queueSize !== null &&
              <Typography type="content">{`Customers in queue: ${this.state.queueSize}`}</Typography>}
        </CardContent>
        <CardActions>
          {this.state.customer.id ?
            (
              <Fragment>
                <Button color="primary" variant="raised" onClick={this.handleFinishClick}>
                  {'Finish'}
                </Button>
                <Button
                  color="primary"
                  variant="raised"
                  style={{'margin-left': '10px'}}
                  onClick={this.handleNoShowClick}
                >
                  {'No Show'}
                </Button>
              </Fragment>
            ) : (
              <Button
                color="primary"
                variant="raised"
                onClick={this.handleNextClick}
                disabled={!this.state.queueSize}
              >
                {'Next customer'}
              </Button>
            ) }
        </CardActions>
      </Card>
    );
  }
};

export default ServingShow;