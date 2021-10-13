import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class PackagesDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { packages: [], isLoading: true, followActivty: false };
  }

  componentDidMount() {
    if (this.props.match.params.activty == 'follow')
      this.setState({ followActivty: true })
    this.setState({ isLoading: true });
    fetch('/api/redis/backOffice/getall/package')
      .then(response => response.json())
      .then(data => this.setState({ packages: data, isLoading: false }));
  }

  render() {
    const { packages, isLoading, followActivty } = this.state;

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
            {followActivty ?
              <Button size="sm" color="primary" tag={Link} to={"/follow/" + item.id}>Follow</Button> :
              <Button disabled={item.list_states[3] ? true : false} size="sm" color="primary" tag={Link} to={"/AddState/" + item.id}>Update state</Button>}
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <h3>My Orders</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Id Description</th>
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

export default PackagesDetails;