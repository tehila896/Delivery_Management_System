import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class DeliveryPersonList extends Component {

  constructor(props) {
    super(props);
    this.state = { deliveryPerson: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('/api/redis/backOffice/getall/DeliveryPerson')
      .then(response => response.json())
      .then(data => this.setState({ deliveryPerson: data, isLoading: false }));
  }

  async remove(username) {
    await fetch(`/api/redis/backOffice/delete_DeliveryPerson/${username}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updateDeliveryPerson = [...this.state.deliveryPerson].filter(i => i.username !== username);
      this.setState({ deliveryPerson: updateDeliveryPerson });
    });
  }

  render() {
    const { deliveryPerson, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const DeliveryPersonList = deliveryPerson.map(item => {
      return <tr key={item.username}>
        <td style={{ whiteSpace: 'nowrap' }}>{item.username}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.firstName}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.lastName}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.price_carryingCapacity}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.speed}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.unitOfDistance}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.carryingCapacity}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.statosCurrentlyWorking == true ? 'V' : 'X'}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/deliveryP/" + item.username}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(item.username)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <br />
          <div className="float-right">
            <Button color="success" tag={Link} to="/deliveryP/new">New Delivery Person</Button>
            {"        "}
            <Button color="success" tag={Link} to="/realse">Realse locked Delivery Person</Button>
          </div>
          <h3>My Deliveries Person</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Username</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>Price Carrying Capacity</th>
                <th>speed</th>
                <th>carryingCapacity</th>
                <th>Unit Of Distance</th>
                <th>busy status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {DeliveryPersonList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default DeliveryPersonList;