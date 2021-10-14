import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import AuthService from "../services/auth.service";

class PackageEdit extends Component {
  currentUser = AuthService.getCurrentUser();
  emptyItem = {
    id: '',
    description: '',
    customer_id: this.currentUser.username,
    carryingCapacity: 'FIVE_KG',
    dateEndOrder: '',
    dateStartOrder: new Date(),
    delivery_id: '',
    list_states: [
      {
        description: 'Order Placed',
        date: new Date(),
        position: {
          x: 3,
          y: 3
        }
      }
    ],
    p_destninon: {
      x: '',
      y: ''
    },
    p_source: {
      x: '',
      y: ''
    },
    payment: {
      paymentType: 'Visa',
      value: 0
    },
    statosCompletedPackage: false,
    unitOfDistance: 'FIVE_KM'
  };

  constructor(props) {
    super(props);
    this.state = {
      carringDrop: false,
      paymentDrop: false,
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.username !== 'new') {
      const customer = await (await fetch(`/api/redis/customer/get/${this.props.match.params.username}`)).json();
      this.setState({ item: customer });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    if (name == "p_destninon.x")
      item.p_destninon.x = value;
    if (name == "p_destninon.y")
      item.p_destninon.y = value;
    if (name == "p_source.x") {
      item.p_source.x = value;
      item.list_states[0].position.x = value;
    }
    if (name == "p_source.y") {
      item.p_source.y = value;
      item.list_states[0].position.y = value;
    }
    if (name == "paymentDrop")
      item.payment.paymentType = value;
    if (name == "carringDrop") {
      switch (value) {
        case '5KG': {
          item.carryingCapacity = "FIVE_KG";
          break;
        }
        case '15KG': {
          item.carryingCapacity = "FIFTEEN_KG";
          break;
        }
        case '50KG': {
          item.carryingCapacity = "FIFTY_KG";
          break;
        }
      }
    }
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    await fetch('/api/redis/customer/order_package', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/packages');
  }
  render() {
    const { item } = this.state;
    const title = <h2>Add Order</h2>;
    return <div>
      <Container>
        <br />
        {title}
        <br /><br />
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="dateStartOrder">Order Date</Label>
            <Input type="text" name="dateStartOrder" id="dateStartOrder" value={item.dateStartOrder || ''}
              onChange={this.handleChange} autoComplete="dateStartOrder" />
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <div>
                <Label for="p_source">Source point:</Label><br />
                <Badge pill>x</Badge><input type="number" style={{ width: "60px" }} name="p_source.x" id="p_source.x" value={item.p_source.x || ''}
                  onChange={this.handleChange} autoComplete="p_source.x" />
                <Badge pill>y</Badge><input type="number" size="4" style={{ width: "60px" }} name="p_source.y" id="p_source.y" value={item.p_source.y}
                  onChange={this.handleChange} autoComplete="p_source.y" />
              </div>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <div>
                <Label for="p_destninon">Destination point:</Label><br />
                <Badge pill>x</Badge><input type="number" style={{ width: "60px" }} name="p_destninon.x" id="p_destninon.x" value={item.p_destninon.x}
                  onChange={this.handleChange} autoComplete="p_destninon.x" />
                <Badge pill>y</Badge><input type="number" style={{ width: "60px" }} name="p_destninon.y" id="p_destninon.y" value={item.p_destninon.y}
                  onChange={this.handleChange} autoComplete="p_destninon.y" />
              </div>
            </FormGroup>
          </div>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <FormGroup>
                <Label for="carringDrop">Carrying Capacity</Label>{' '}
                <Input type="select" name="carringDrop" id="carringDrop" onChange={this.handleChange}>
                  <option value="5KG">5KG</option>
                  <option value="15KG">15KG</option>
                  <option value="50KG">50KG</option>
                </Input>
              </FormGroup>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <FormGroup>
                <Label for="paymentDrop">Payment type</Label>{' '}
                <Input type="select" name="paymentDrop" id="paymentDrop" onChange={this.handleChange}>
                  <option value="Visa">Visa</option>
                  <option value="Cash">Cash</option>
                  <option value="Check">Check</option>
                </Input>
              </FormGroup>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit" style={{ width: "150px" }}>Save</Button>{'    '}
            <Button color="secondary" tag={Link} to="/packages" style={{ width: "150px" }}>Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(PackageEdit);