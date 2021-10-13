import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

export default class UpdateDetails extends Component {

  emptyItem = {
    username:'',
    lastName: '',
    firstName: '',
    email: '',
    password:''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
        const customer = await (await fetch(`/api/redis/customer/get/${this.props.match.params.username}`)).json();
        this.setState({ item: customer });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    await fetch('/api/redis/customer/save_customer/${item.username}', {
        method:'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
      this.props.history.push('/Profile');
  }
  render() {
    const {item} = this.state;
    const title = <h2>Edit Customer</h2>;

    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
        <FormGroup>
            <Label for="username">username</Label>
            <Input disabled={true} type="text" name="username" id="username" value={item.username}
                   onChange={this.handleChange} autoComplete="username"/>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">LastName</Label>
            <Input type="text" name="lastName" id="lastName" value={item.lastName}
                   onChange={this.handleChange} autoComplete="lastName"/>
          </FormGroup>
          <FormGroup>
            <Label for="firstName">FirstName</Label>
            <Input type="text" name="firstName" id="firstName" value={item.firstName}
                   onChange={this.handleChange} autoComplete="firstName"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" value={item.email}
                   onChange={this.handleChange} autoComplete="email"/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="text" name="email" id="password" value={item.password}
                   onChange={this.handleChange} autoComplete="password"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit" >Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/profile">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}
