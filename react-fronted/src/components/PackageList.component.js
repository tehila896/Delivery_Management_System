import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";

class PackageList extends Component {

  constructor(props) {
    super(props);
    this.state = { packages: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const currentUser = AuthService.getCurrentUser();
    fetch(`/api/redis/customer/findPackageBy_customerId/${currentUser.username}`)
      .then(response => response.json())
      .then(data => this.setState({ packages: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/group/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatePackages = [...this.state.groups].filter(i => i.id !== id);
      this.setState({ packages: updatePackages });
    });
  }

  render() {
    const { packages, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const PackageList = packages.map(item => {
      return <tr key={item.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{item.id}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.carryingCapacity}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.dateStartOrder}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.payment.paymentType}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.payment.value}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.list_states[item.list_states.length - 1].description}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.statosCompletedPackage ? 'true' : 'false'}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/follow/" + item.id}>Follow</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/packages/new">New Order</Button>
          </div>
          <h3>My Orders</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Id Order</th>
                <th>Carrying weight</th>
                <th>Order Date</th>
                <th>payment type</th>
                <th>Total</th>
                <th>Situation</th>
                <th>completed</th>
                <th>Order activity</th>
              </tr>
            </thead>
            <tbody>
              {PackageList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default PackageList;