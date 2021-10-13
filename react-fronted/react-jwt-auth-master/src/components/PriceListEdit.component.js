import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

class PriceListEdit extends Component {
    emptyItem = [
        {
            id: "",
            row1: "FIVE_KM",
            columns1: {
                FIVE_KG: 0,
                FIFTEEN_KG: 0,
                FIFTY_KG: 0
            },
            row2: "FIFTEEN_KM",
            columns2: {
                FIVE_KG: 0,
                FIFTEEN_KG: 0,
                FIFTY_KG: 0
            },
            row3: "FIFTY_KM",
            columns3: {
                FIVE_KG: 0,
                FIFTEEN_KG: 0,
                FIFTY_KG: 0
            }
        }
    ];
    constructor(props) {
        super(props);
        this.state = { priceList: this.emptyItem, isLoading: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.action == "update") {
            this.setState({ isLoading: true });
            fetch(`/api/redis/backOffice/getall/PriceField`)
                .then(response => response.json())
                .then(data => this.setState({ priceList: data, isLoading: false }));
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name);
        let priceList = { ...this.state.priceList };
        switch (name) {
            case '0FIVE_KG': {
                priceList[0].columns1.FIVE_KG = value;
                break;
            }
            case '0FIFTEEN_KG': {
                priceList[0].columns1.FIFTEEN_KG = value;
                break;
            }
            case '0FIFTY_KG': {
                priceList[0].columns1.FIFTY_KG = value;
                break;
            }
            case '1FIVE_KG': {
                priceList[0].columns2.FIVE_KG = value;
                break;
            }
            case '1FIFTEEN_KG': {
                priceList[0].columns2.FIFTEEN_KG = value;
                break;
            }
            case '1FIFTY_KG': {
                priceList[0].columns2.FIFTY_KG = value;
                break;
            }
            case '2FIVE_KG': {
                priceList[0].columns3.FIVE_KG = value;
                break;
            }
            case '2FIFTEEN_KG': {
                priceList[0].columns3.FIFTEEN_KG = value;
                break;
            }
            case '2FIFTY_KG': {
                priceList[0].columns3.FIFTY_KG = value;
                break;
            }
        }
        this.setState({ priceList });
    }

    async handleSubmit(event) {
        debugger;
        event.preventDefault();
        const { priceList } = this.state;
        const response = await fetch('/api/redis/backOffice/add_priceField', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(priceList[0]),
        });
        if (response.status == 200) {
            this.props.history.push('/priceList');
        }
    }

    async remove(id) {
        await fetch(`/api/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatePackages = [...this.state.priceList].filter(i => i.id !== id);
            this.setState({ priceList: updatePackages });
        });
    }

    render() {
        const { priceList, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        console.log(priceList);
        return (
            <div>
                <Container fluid>
                    <br /><br /><br />
                    <h3>Price List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th>    </th>
                                <th>5 KG</th>
                                <th>15 KG</th>
                                <th>50 KG</th>
                            </tr>
                            <tr>
                                <th>5 KM</th>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="0FIVE_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns1.FIVE_KG}></input></td>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="0FIFTEEN_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns1.FIFTEEN_KG}></input></td>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="0FIFTY_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns1.FIFTY_KG}></input></td>
                            </tr>
                            <tr>
                                <th>15 KM</th>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="1FIVE_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns2.FIVE_KG}></input></td>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="1FIFTEEN_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns2.FIFTEEN_KG}></input></td>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="1FIFTY_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns2.FIFTY_KG}></input></td>
                            </tr>
                            <tr>
                                <th>50 KM</th>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="2FIVE_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns3.FIVE_KG}></input></td>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="2FIFTEEN_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns3.FIFTEEN_KG}></input></td>
                                <td style={{ whiteSpace: 'nowrap' }}><input name="2FIFTY_KG" onChange={this.handleChange} style={{ width: "100px" }} type="number" value={priceList[0].columns3.FIFTY_KG}></input></td>
                            </tr>
                        </thead>
                    </Table>
                </Container>
                <br /><br /><br />
                <FormGroup>
                    <Button color="primary" type="submit" onClick={this.handleSubmit} style={{ width: "150px" }}>Save</Button>{'    '}
                    <Button color="secondary" tag={Link} to="/priceList" style={{ width: "150px" }}>Cancel</Button>
                </FormGroup>
            </div>
        );
    }
}

export default PriceListEdit;