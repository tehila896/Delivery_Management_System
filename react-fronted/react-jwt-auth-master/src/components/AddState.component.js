// import React, { Component,useState } from 'react';
// import { Button, ButtonGroup, Container, Form,Label,Badge,FormGroup,Input } from 'reactstrap';
// import { Link,withRouter } from 'react-router-dom';
// import {AiOutlineFileProtect } from "react-icons/ai";
// import {FiShoppingBag } from "react-icons/fi";
// import {BsFillPersonCheckFill } from "react-icons/bs";
// import {BiBusSchool } from "react-icons/bi";
// class AddState extends Component {

//     empty_state = {
//         description: '',
//         date:new Date(),
//         position: {
//           x: '',
//           y: ''
//         }}

//   constructor(props) {
//     super(props);
//     this.state = {packageT: {}, isLoading: true,current_state :this.empty_state};
//   }

//   componentDidMount() {
//     this.setState({isLoading: true});
//     const res=fetch(`/api/redis/customer/getPackage/7676`)
//       .then(response => response.json())
//       .then(data => this.setState({packageT: data, isLoading: false}));
//       console.log(res);
//   }
//    handleChange(event) {
//     debugger;
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     let current_state = {...this.state.current_state};
// if(name="position.x")
// current_state.position.x=value;
// if(name="position.y")
// current_state.position.x=value;
// if(name="date")
// current_state[name] = value;
// if(name="Order Placed"||name=="Package Shipped")
// current_state.description = value;
//     this.setState({current_state});
//   }

//   async handleSubmit(event) {
//     this.handleChange(event);
//     event.preventDefault();
//     const {item} = this.state.current_state;
//     await fetch('/api/redis/customer/save_customer/${item.username}', {
//         method:'PUT',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(item),
//       });
//       this.props.history.push('/Profile');
//   }
//   render() {
//     const {packageT, isLoading,current_state} = this.state;

//     if (isLoading) {
//       return <p>Loading...</p>;
//     }
//     return (
//       <div>
//         <Container >
//           <br/>
//           <h3>Order Id:{packageT.id}</h3>
//          <Form>
//            <br/>
//            <br/>
//             <div className="row">
//             <h4 for="date">Date:</h4>
//             <Input type="text" name="date" id="date" value={current_state.date || ''}
//             onChange={this.handleChange} autoComplete="date" /></div>
//             <br/>
//            <div className="row">
//                  <h4 for="postion">Postion point:</h4>
//                  <Badge pill>x</Badge><input type="number" style={{ width: "60px" }} name="position.x" id="position.x" value={current_state.position.x||''}
//                   onChange={this.handleChange} autoComplete="position.x"/>
//                 <Badge pill>y</Badge><input type="number" style={{ width: "60px" }} name="position.y" id="position.y" value={current_state.position.y||''}
//                   onChange={this.handleChange} autoComplete="position.y"/>
//               </div>
//               <br/>
//               <br/>
//           <div className="row">
//           <button>
//           <div >
//           <h1><AiOutlineFileProtect/></h1>
//           <strong>Order Placed</strong>
//           </div>
// </button>

//           <div ><h1>. . . . . . . .</h1></div>
//           <button id="Package Shipped" onClick={this.handleChange}>
//           <div >
//           <h1><BiBusSchool/></h1>
//           <strong>Package Shipped</strong>
//          </div>
// </button>
//           <div ><h1>. . . . . . . .</h1></div>
// <button>
//          <div>
//          <h1><BsFillPersonCheckFill /></h1>
//           <strong>Waiting to be picked up</strong>
//           </div>
// </button>
//           <div ><h1>. . . . . . . .</h1></div>
//           <button>
//           <div>
//           <h1><FiShoppingBag/></h1>
//           <strong>Have been signed</strong>
//           </div> 
//           </button> 
//           </div> 
//           </Form>
//         </Container>
//       </div>
//     );
//   }
// }

// export default withRouter(AddState);




import React, { Component } from 'react';
import { AiOutlineFileProtect } from "react-icons/ai";
import { BiBusSchool } from "react-icons/bi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { withRouter } from 'react-router-dom';
import { Badge, Container, Form, Input, Button } from 'reactstrap';
import AuthService from "../services/auth.service";

class AddState extends Component {

    emptyPackage = {
        id: '',
        customer_id: '',
        carryingCapacity: 'FIVE_KG',
        dateEndOrder: '',
        dateStartOrder: new Date(),
        delivery_id: '',
        list_states: [
            {
                description: '',
                date: '',
                position: {
                    x: '',
                    y: ''
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

    emptyState = {
        description: '',
        date: new Date(),
        position: {
            x: '',
            y: ''
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyPackage,
            carringDrop: false,
            unitDrop: false,
            salaryDrop: false,
            commnictionDrop: false,
            disabledId: false,
            current_state: this.emptyState
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            debugger;
            const deliveryPerson = await (await fetch(`/api/redis/customer/get/PackageById/${this.props.match.params.id}`)).json();
            this.setState({ item: deliveryPerson, disabledId: true });
            console.log(deliveryPerson);
        }

    }

    handleClick(event, id) {
        let current_state = { ...this.state.current_state };
        // let item = { ...this.item };
        current_state.description = id;
        // if (id == "Have been signed") {
        //     item.statosCompletedPackage = true;
        // }
        this.setState({ current_state });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let current_state = { ...this.state.current_state };
        if (name == "position.x")
            current_state.position.x = value;
        if (name == "position.y")
            current_state.position.y = value;
        if (name == "date")
            current_state.date = value;
        this.setState({ current_state });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { current_state } = this.state;
        const response = await fetch('/api/redis/DeliveryPerson/update_State_Package/id/' + this.props.match.params.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(current_state),
        });
        this.props.history.push('/currentPackage/' + AuthService.getCurrentUser().username);

    }

    render() {
        const { item, current_state } = this.state;
        const title = <h2>'Edit DeliveryPerson'</h2>;
        return <div>
            <div>
                <Container >
                    <br />
                    <h3>Order Id : {this.props.match.params.id}</h3>
                    <br />
                    <br />
                    <div className="row">
                        <h4 for="date">Date:</h4>
                        <Input type="text" name="date" id="date" value={current_state.date || ''}
                            onChange={this.handleChange} autoComplete="date" />
                    </div>

                    <br />
                    <div className="row">
                        <h4 for="postion">Postion point:</h4>
                        <Badge pill>x</Badge><input type="number" style={{ width: "60px" }} name="position.x" id="position.x" value={current_state.position.x || ''}
                            onChange={this.handleChange} autoComplete="position.x" />
                        <Badge pill>y</Badge><input type="number" style={{ width: "60px" }} name="position.y" id="position.y" value={current_state.position.y || ''}
                            onChange={this.handleChange} autoComplete="position.y" />
                    </div>

                    <br />
                    <br />
                    <div className="row">
                        <button disabled={item.list_states ? true : false} onClick={(e) => this.handleClick(e, "Order Placed")}>
                            <div >
                                <h1><AiOutlineFileProtect /></h1>
                                <strong id="Order Placed" name="Order Placed" >Order Placed</strong>
                            </div>
                        </button>
                        <div ><h1>. . . . . . . .</h1></div>
                        <button disabled={item.list_states[1] ? true : false} onClick={(e) => this.handleClick(e, "Package Shipped")}>
                            <div
                            >
                                <h1><BiBusSchool /></h1>
                                <strong>Package Shipped</strong>
                            </div>
                        </button>
                        <div ><h1>. . . . . . . .</h1></div>

                        <button disabled={item.list_states[2] ? true : false} onClick={(e) => this.handleClick(e, "Waiting to be picked up")}>
                            <div>
                                <h1><BsFillPersonCheckFill /></h1>
                                <strong>Waiting to be picked up</strong>
                            </div>
                        </button>
                        <div ><h1>. . . . . . . .</h1></div>

                        <button disabled={item.list_states[3] ? true : false} onClick={(e) => this.handleClick(e, "Have been signed")}>
                            <div>
                                <h1><FiShoppingBag /></h1>
                                <strong>Have been signed</strong>
                            </div>
                        </button>
                    </div>
                    <br /><br /><br /><br /><br />
                    <Button color="primary" type="submit" onClick={this.handleSubmit} style={{ width: "150px" }}>Save State</Button>
                </Container>

            </div>
        </div>
    }
}

export default withRouter(AddState);