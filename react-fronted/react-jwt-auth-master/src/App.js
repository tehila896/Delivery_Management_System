import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import PackageList from "./components/PackageList.component";
import PackageEdit from "./components/PackageEdit.cpmponent";
import PackagesDetails from "./components/PackagesDetails.component";
import CustomerDetails from "./components/CustomerDetails.component";
import CustomerList from "./components/CustomerList.component";
import DeliveryPersonEdit from "./components/DeliveryPersonEdit.component";
import DeliveryPersonList from "./components/DeliveryPersonList.component";
import CurrentState from "./components/CurrentState.component";
import Sa from "./components/Sa.component";
import Follow from "./components/Follow.component";
import PriceList from "./components/PriceList.component";
import PriceListEdit from "./components/PriceListEdit.component";
import ReaseDeliveryPerson from "./components/ReaseDeliveryPerson.component";
import AddState from "./components/AddState.component";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showBackoffice: false,
      showDeliveryPerson: false,
      showCustomer: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showBackoffice: false,
        showCustomer: false,
        showDeliveryPerson: false,
      });
      if (user.role == "ROLE_BACKOFFICE") {
        this.setState({
          showDeliveryPerson: false,
          showCustomer: false,
          showBackoffice: true,
        });
      }
      if (user.role == "ROLE_DELIVERY_PERSON") {
        this.setState({
          showBackoffice: false,
          showCustomer: false,
          showDeliveryPerson: true
        });
      }
      if (user.role == "ROLE_CUSTOMER") {
        this.setState({
          showBackoffice: false,
          showCustomer: true,
          showDeliveryPerson: false
        });
      }
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showBackoffice: false,
      showDeliveryPerson: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showBackoffice, showDeliveryPerson, showCustomer } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <Link to={"/"} className="navbar-brand">
              tehila896
            </Link>
            {showBackoffice && (
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/deliveryP"} className="nav-link">
                  Delivery Person
                </Link>
                <Link to={"/customers"} className="nav-link">
                  Customers
                </Link>
                <Link to={"/packagesDetails/" + 'follow'} className="nav-link">
                  Packages
                </Link>
                <Link to={"/priceList"} className="nav-link">
                  Price List
                </Link>
              </nav>
            )}
            {showDeliveryPerson && (
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/deliveryP/" + currentUser.username} className="nav-link">
                  Edit DeliveryPerson
                </Link>
                <Link to={"/currentPackage/" + currentUser.username} className="nav-link">
                  current order
                </Link>
              </nav>
            )}

            {showCustomer && (
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/packages"} className="nav-link">
                  My Orders
                </Link>
                <Link to={"/customers/" + currentUser.username} className="nav-link">
                  Edit Details
                </Link>
              </nav>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />/packages/:username
            <Route path='/follow/:id' exact={true} component={Follow} />
            <Route path='/AddState/:id' exact={true} component={AddState} />
            <Route path='/packages' exact={true} component={PackageList} />
            <Route path='/packages/:username' component={PackageEdit} />
            <Route path='/packagesDetails/:activty' exact={true} component={PackagesDetails} />
            <Route path='/currentPackage/:id' exact={true} component={CurrentState} />
            <Route path='/customers/:username' component={CustomerDetails} />
            <Route path='/customers' component={CustomerList} />
            <Route path='/deliveryP' exact={true} component={DeliveryPersonList} />
            <Route path='/deliveryP/:username' exact={true} component={DeliveryPersonEdit} />
            <Route path='/priceList' exact={true} component={PriceList} />
            <Route path='/priceList/:action' exact={true} component={PriceListEdit} />
            <Route path='/realse' component={ReaseDeliveryPerson} />
          </Switch>
        </div>

        {/* <AuthVerify logOut={this.logOut}/>  */}
      </div>
    );
  }
}

export default App;
