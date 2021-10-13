import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Form, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AiOutlineFileProtect } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BiBusSchool } from "react-icons/bi";
class Follow extends Component {

  constructor(props) {
    super(props);
    this.state = { packageT: {}, isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`/api/redis/customer/getPackage/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => this.setState({ packageT: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/group/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.packageT].filter(i => i.id !== id);
      this.setState({ packageT: updatedGroups });
    });
  }

  render() {
    const { packageT, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Container>
          <br />
          <h3>Order Id:{packageT.id}</h3>
          <Form>
            <br />
            <br />
            <div className="row" style={{ position: "fixed", left: "150px" }}  >
              {packageT.list_states ?
                <div >
                  <h1><AiOutlineFileProtect /></h1>
                  <strong>Order Placed</strong>
                  <div ><br />
                    <Toast style={{ width: "199px" }}>
                      <ToastHeader>
                      </ToastHeader>
                      <ToastBody>
                        <ToastBody>
                          <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>date :</strong><br />{packageT.list_states[0].date.substring(0, 10)}</p>
                          <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>time :</strong><br />{packageT.list_states[0].date.substring(11, 16)}</p>
                          <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>position :</strong><br />{packageT.list_states[0].position.x},{packageT.list_states[0].position.y}</p>
                        </ToastBody>
                      </ToastBody>
                    </Toast>
                  </div>
                </div> : false}

              {packageT.list_states[1] ?
                <div ><h1>. . . . . . . .</h1></div> : false}

              {packageT.list_states[1] ?
                <div >
                  <h1><BiBusSchool /></h1>
                  <strong>Package Shipped</strong>
                  <div ><br />
                    <Toast style={{ width: "199px" }}>
                      <ToastHeader>
                      </ToastHeader>
                      <ToastBody>
                        <ToastBody>
                          <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>date :</strong><br />{packageT.list_states[1].date.substring(0, 10)}</p>
                          <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>time :</strong><br />{packageT.list_states[1].date.substring(11, 16)}</p>
                          <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>position :</strong><br />{packageT.list_states[1].position.x},{packageT.list_states[1].position.y}</p>
                        </ToastBody>
                      </ToastBody>
                    </Toast>
                  </div>
                </div> : false}

              {packageT.list_states[2] ?
                <div ><h1>. . . . . . . .</h1></div> : false}

              {packageT.list_states[2] ?
                <div>
                  <h1><BsFillPersonCheckFill /></h1>
                  <strong>Waiting to be picked up</strong>
                  <br />
                  <Toast style={{ width: "199px" }}>
                    <ToastHeader>
                    </ToastHeader>
                    <ToastBody>
                      <ToastBody>
                        <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>date :</strong><br />{packageT.list_states[2].date.substring(0, 10)}</p>
                        <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>time :</strong><br />{packageT.list_states[2].date.substring(11, 16)}</p>
                        <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>position :</strong><br />{packageT.list_states[2].position.x},{packageT.list_states[2].position.y}</p>
                      </ToastBody>
                    </ToastBody>
                  </Toast>
                </div> : false}

              {packageT.list_states[3] ?
                <div ><h1>. . . . . . . .</h1></div> : false}

              {packageT.list_states[3] ?
                <div>
                  <h1><FiShoppingBag /></h1>
                  <strong>Have been signed</strong>
                  <br />
                  <Toast style={{ width: "199px" }}>
                    <ToastHeader>
                    </ToastHeader>
                    <ToastBody>
                      <ToastBody>
                        <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>date :</strong><br />{packageT.list_states[3].date.substring(0, 10)}</p>
                        <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>time :</strong><br />{packageT.list_states[3].date.substring(11, 16)}</p>
                        <p style={{ color: "green", textAlign: "left" }}><strong style={{ color: "gray" }}>position :</strong><br />{packageT.list_states[3].position.x},{packageT.list_states[3].position.y}</p>
                      </ToastBody>
                    </ToastBody>
                  </Toast>
                </div> : false}
            </div>
          </Form>
        </Container>
      </div >
    );
  }
}

export default Follow;