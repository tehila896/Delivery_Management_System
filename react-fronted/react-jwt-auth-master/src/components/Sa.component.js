import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, FormGroup, Label, ListGroup, ListGroupItem, Badge, Input as Rinput } from 'reactstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FcCancel } from "react-icons/fc";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vlastName = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The lastName must be between 3 and 20 characters.
      </div>
    );
  }
};
const vfirstName = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The firstName must be between 3 and 20 characters.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const usernameID = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Username already in used
      </div>
    );
  }
};
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vuniqUsername = value => {
  if (value == "@") {
    return (
      <div className="alert alert-danger" role="alert">
        <strong> Username is already in use!, try another name </strong>
      </div>
    );
  }
};
class Sa extends Component {

  emptyItem = {
    id: '',
    firstName: '',
    lastName: '',
    carryingCapacity: "FIVE_KG",
    communication_way: 'email',
    getSalary_way: 'Visa',
    price_carryingCapacity: '',
    speed: '',
    unitOfDistance: 'FIVE_KM',
    statosCurrentlyWorking: false,
    lock: "unlock",
    password: '',
    position: {
      x: '',
      y: ''
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      uniqUsername: {},
      carringDrop: false,
      unitDrop: false,
      salaryDrop: false,
      commnictionDrop: false,
      disabledId: false,
      successful: false,
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlet = this.handlet.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const deliveryPerson = await (await fetch(`/api/redis/DeliveryPerson/getById/${this.props.match.params.id}`)).json();
      this.setState({ item: deliveryPerson, disabledId: true });
    }
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    if (name == "position.y")
      item.position.y = value;
    if (name == "position.x")
      item.position.x = value;
    if (name == "salaryDrop")
      item.getSalary_way = value;

    if (name == "commnictionDrop") {
      debugger;
      item.communication_way = value;
    }
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
    if (name == "unitDrop") {
      switch (value) {
        case '5KM': {
          item.unitOfDistance = "FIVE_KM";
          break;
        }
        case '15KM': {
          item.unitOfDistance = "FIFTEEN_KM";
          break;
        }
        case '50KM': {
          item.unitOfDistance = "FIFTY_KM";
          break;
        }
      }
    }
    if (name == "id" || name == "lastName" || name == "firstName" || name == "speed" || name == "price_carryingCapacity" || name == "statosCurrentlyWorking" || name == "password")
      item[name] = value;
    console.log(item);
    this.setState({ item });
  }


  async handleSubmit(event) {
    event.preventDefault();
    debugger;
    const { item } = this.state
    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      event.preventDefault();
      const response = await fetch('/api/redis/DeliveryPerson/add_DeliveryPerson/' + (item.id ? '/' + item.id : ''), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
      if (response.status == 200) {
        this.props.history.push('/deliveryP');
      }
    }
  }

  async handlet(event) {
    event.preventDefault();
    debugger;
    const { item } = this.state
    event.preventDefault();
    if (this.props.match.params.id == "new") {
      try {
        const res = await (await fetch(`/api/redis/DeliveryPerson/getById/` + item.id)).json();
        item.id = "@";
        this.setState({
          message: "",
          successful: false,
          item
        });
      }
      catch {
        this.handleSubmit(event);
      }
    }
    else
      this.handleSubmit(event);
  }

  render() {
    const { item } = this.state;
    const title = <h2>{this.state.disabledId == true ? 'Edit DeliveryPerson' : 'Add DeliveryPerson'}</h2>;
    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handlet} ref={c => {
          this.form = c;
        }}>
          {!this.state.successful && (
            <div>
              <div className="row">
                <FormGroup className="col-md-4 mb-3">
                  <FormGroup>
                    <div className="form-group">
                      <Label for="id">UserName</Label>
                      <Input className="form-control" type="text" name="id" id="id" disabled={this.state.disabledId} value={item.id || ''}
                        onChange={this.handleChange} autoComplete="id" validations={[required, vusername, vuniqUsername]} />
                    </div>
                  </FormGroup>
                </FormGroup>
                <FormGroup className="col-md-4 mb-3">
                  <FormGroup>
                    <Label for="id">Password</Label>
                    <Input className="form-control" type="text" name="password" id="password" disabled={this.state.disabledId} value={item.password || ''}
                      onChange={this.handleChange} autoComplete="password" validations={[required, vpassword]} />
                  </FormGroup>
                </FormGroup>
              </div>
              <div className="row">
                <FormGroup className="col-md-4 mb-3">
                  <FormGroup>
                    <Label for="firstName">firstName</Label>
                    <Input className="form-control" type="text" name="firstName" id="firstName" value={item.firstName || ''}
                      onChange={this.handleChange} autoComplete="address-level1" validations={[required, vfirstName]} />
                  </FormGroup>
                </FormGroup>
                <FormGroup className="col-md-4 mb-3">
                  <FormGroup>
                    <Label for="lastName">lastName</Label>
                    <Input className="form-control" type="text" name="lastName" id="lastName" value={item.lastName || ''}
                      onChange={this.handleChange} autoComplete="lastName" validations={[required, vlastName]} />
                  </FormGroup>
                </FormGroup>
              </div>
              <div className="row">
                <FormGroup className="col-md-4 mb-3">
                  <FormGroup>
                    <Label for="commnictionDrop">communication way</Label>{' '}
                    <Rinput type="select" name="commnictionDrop" id="commnictionDrop" onChange={this.handleChange}>
                      <option value="email">email</option>
                      <option value="facebook">facebook</option>
                      <option value="wazap">wazap</option>
                    </Rinput>
                  </FormGroup>
                </FormGroup>
                <FormGroup className="col-md-3 mb-3">
                  <FormGroup>
                    <Label for="salaryDrop">getSalary way</Label>{' '}
                    <Rinput type="select" name="salaryDrop" id="salaryDrop" onChange={this.handleChange}>
                      <option value="Visa">Visa</option>
                      <option value="Cash">Cash</option>
                      <option value="Check">Check</option>
                    </Rinput>
                  </FormGroup>
                </FormGroup>
              </div>
              <div className="row">
                <FormGroup className="col-md-4 mb-3">
                  <FormGroup>
                    <Label for="carringDrop">Carrying Capacity</Label>{' '}
                    <Rinput type="select" name="carringDrop" id="carringDrop" onChange={this.handleChange}>
                      <option value="5KG">5KG</option>
                      <option value="15KG">15KG</option>
                      <option value="50KG">50KG</option>
                    </Rinput>
                  </FormGroup>
                </FormGroup>
                <FormGroup className="col-md-3 mb-3">
                  <FormGroup>
                    <Label for="unitDrop">Unit Of Distance</Label>{' '}
                    <Rinput type="select" name="unitDrop" id="unitDrop" onChange={this.handleChange}>
                      <option value="5KM">5KM</option>
                      <option value="15KM">15KM</option>
                      <option value="50KM">50KM</option>
                    </Rinput>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <FormGroup>
                    {this.state.disabledId == true ?
                      <div>
                        <FormGroup>
                          <Label for="statosCurrentlyWorking">Available status</Label>{' '}
                          <Rinput type="select" name="statosCurrentlyWorking" id="statosCurrentlyWorking" onChange={this.handleChange}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </Rinput>
                        </FormGroup>
                      </div>
                      : false
                    }
                  </FormGroup>
                </FormGroup>
              </div>
              <div className="row">
                <FormGroup className="col-md-3 mb-3">
                  <Label for="price_carryingCapacity">Price Carrying Capacity for an hour</Label>
                  <Input className="form-control" type="text" name="price_carryingCapacity" id="price_carryingCapacity" value={item.price_carryingCapacity || ''}
                    onChange={this.handleChange} autoComplete="price_carryingCapacity" validations={[required]} />
                </FormGroup>
                <FormGroup className="col-md-3 mb-3">
                  <Label for="speed">speed</Label>
                  <Input className="form-control" type="text" name="speed" id="speed" value={item.speed || ''}
                    onChange={this.handleChange} autoComplete="speed" validations={[required]} />
                </FormGroup>
                <FormGroup className="col-md-3 mb-3">
                  <div>
                    <Label for="postion">Postion point:</Label>
                    <Badge pill>x</Badge><input type="number" style={{ width: "60px" }} name="position.x" id="position.x" value={item.position.x}
                      onChange={this.handleChange} autoComplete="position.x" validations={[required]} />
                    <Badge pill>y</Badge><input type="number" style={{ width: "60px" }} name="position.y" id="position.y" value={item.position.y}
                      onChange={this.handleChange} autoComplete="position.y" validations={[required]} />
                  </div>
                </FormGroup>
              </div>
              <FormGroup>
                <Button color="primary" type="submit">Save</Button>
                <Button color="secondary" tag={Link} to="/deliveryP">Cancel</Button>
              </FormGroup>

            </div>
          )}
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={c => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(Sa);
