import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class CurrentState extends Component {

    constructor(props) {
        super(props);
        this.state = { currentPackage: {}, isLoading: true };
    }

    componentDidMount() {
        // console.log(this.state.currentPackage.id == null ? false : true)
        this.setState({ isLoading: true });
        const res = fetch(`/api/redis/DeliveryPerson/findPackageByDELIId/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({ currentPackage: data, isLoading: false }));
    }

    render() {
        const { currentPackage, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        const PackageList = currentPackage.id == undefined ?
            <tr><h2><strong style={{ color: "red" }}>you don`t have any order to care about, please check later</strong></h2></tr>
            :
            <tr key={currentPackage
                .id}>
                <td style={{ whiteSpace: 'nowrap' }}>{currentPackage
                    .id}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{currentPackage
                    .carryingCapacity}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{currentPackage
                    .dateStartOrder}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{currentPackage
                    .payment.paymentType}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{currentPackage
                    .payment.value}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{currentPackage
                    .list_states[currentPackage
                        .list_states.length - 1].description}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/AddState/" + currentPackage
                            .id}>Update state</Button>
                    </ButtonGroup>
                </td>
            </tr>

        return (
            <div>
                <Container fluid>
                    <h3>Current Order:{currentPackage.id ? currentPackage.id : '-------'}</h3>
                    <Table className="mt-4">
                        <thead>
                            {currentPackage.id ?
                                <tr>
                                    <th>Id Description</th>
                                    <th>Carrying weight</th>
                                    <th>Order Date</th>
                                    <th>payment type</th>
                                    <th>Total</th>
                                    <th>Situation</th>
                                    <th>Order activity</th>
                                </tr>
                                : false}
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

export default CurrentState;