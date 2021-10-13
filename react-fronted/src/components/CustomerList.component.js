import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class CustomersList extends Component {

  constructor(props) {
    super(props);
    this.state = { customers: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('/api/redis/backOffice/getall/customer')
      .then(response => response.json())
      .then(data => this.setState({ customers: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/redis/customer/delete_customer/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatecustomers = [...this.state.customers].filter(i => i.username !== id);
      this.setState({ customers: updatecustomers });
    });
  }

  render() {
    const { customers, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    const customersList =
      customers.map(item => {
        return <tr key={item.username}>
          <td style={{ whiteSpace: 'nowrap' }}>{item.username}</td>
          <td style={{ whiteSpace: 'nowrap' }}>{item.firstName}</td>
          <td style={{ whiteSpace: 'nowrap' }}>{item.lastName}</td>
          <td style={{ whiteSpace: 'nowrap' }}>{item.email}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="danger" onClick={() => this.remove(item.username)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      });

    return (
      <div>
        <Container fluid>
          <br />
          <h3>My Customers</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>User Name</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customersList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CustomersList;