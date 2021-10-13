import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FcCancel } from "react-icons/fc";
import { Container } from 'reactstrap';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" password="alert">
        This field is required!
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
  const vusername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      error:"",
      errorIcon:false,
      users:[],
      currentUser:{
        username: "",
        role:"",
        password:""}
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      error:"",
      errorIcon:false,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      error:"",
      errorIcon:false,
    });
  }
  async handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: false,
      error:"",
      errorIcon:false,
      users:[],
      currentUser:{
        username: "",
        role:"",
      password:""}
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
        const response = await (await fetch('/api/redis/getall/usersRole'));
        const body = await response.json();
        this.setState({ users: body, isLoading: false });
        // if(this.state.users.some(item => item.username === this.state.username ))
        // {
        //   const response = await (await fetch('/api/redis/login/'+(this.state.username)));
        //   const body =await response.json();
        //   this.setState({currentUser:body,isLoading: false });
        //   localStorage.setItem('user', JSON.stringify(body));
        //   this.props.history.push("/profile");
        //   window.location.reload(); 
        // }
        // else{
        //     this.setState({
        //         message: "",
        //         successful: false,
        //         error:"Username is never used!",
        //         errorIcon:true
        //       });
        // }
        if(this.state.users.some(item => item.username === this.state.username ))
        {
            if(this.state.users.some(item => item.password === this.state.password))
            {
                const response = await (await fetch('/api/redis/login/'+(this.state.username)));
                const body =await response.json();
                this.setState({currentUser:body,isLoading: false });
                localStorage.setItem('user', JSON.stringify(body));
                this.props.history.push("/profile");
                window.location.reload();
            }
            else{
                this.setState({
                    message: "",
                    successful: false,
                    error:"password is not valid!",
                    errorIcon:true
                  });
            }
        }
        else{
            this.setState({
                message: "",
                successful: false,
                error:"Username is never used!",
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
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
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
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
              <div className="error">  
                  <FcCancel style={{display:this.state.errorIcon?"block":"none"}}/>{this.state.error}
                </div>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" password="alert">
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
        </div>
      </div>
      </Container>
      </div>
    );
  }
}
