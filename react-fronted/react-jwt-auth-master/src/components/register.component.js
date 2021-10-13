import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import isEmail from 'validator/lib/isEmail';
import { FcCancel } from "react-icons/fc";
import { Container } from 'reactstrap';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vlastName = value => {
  if (value.length < 3 || value.length > 20){
    return (
      <div className="alert alert-danger" role="alert">
        The lastName must be between 3 and 20 characters.
      </div>
    );
  }
};
const vfirstName = value => {
  if  (value.length < 3 || value.length > 20) {
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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      lastName:"",
      firstName:"",
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      error:"",
      errorIcon:false
    };
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      error:"",
      errorIcon:false
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  async handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
      error:"",
      errorIcon:false
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
    e.preventDefault();
     const response=await fetch('/api/redis/customer/save_customer', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"lastName":this.state.lastName,
        "firstName":this.state.firstName,
        "username":this.state.username,
        "email":this.state.email,
        "password":this.state.password}),
    })
    if(response.status==200)
    {
         this.props.history.push("/login");   
    }
    else{
        this.setState({
            message: "",
            successful: false,
            error:"Username is already in use!",
            errorIcon:true
          });
  }
    }
  }

  render() {
    return (
        <div>
          <Container fluid>
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (

              <div>
              <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">LastName</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required, vlastName]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">FirstName</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required, vfirstName]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                  <div className="error">  
                  <FcCancel style={{display:this.state.errorIcon?"block":"none"}}/>{this.state.error}
                  </div>
                </div>
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
              style={{ display : "none"}}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
      </Container>
      </div>
    );
  }
}