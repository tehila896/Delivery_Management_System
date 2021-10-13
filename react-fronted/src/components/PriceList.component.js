import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
class PriceList extends Component {

    constructor(props) {
        super(props);
        this.state = { priceList: [], isLoading: true };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch(`/api/redis/backOffice/getall/PriceField`)
            .then(response => response.json())
            .then(data => this.setState({ priceList: data, isLoading: false }));
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
        const PriceListEmpty = <thead >
            <tr>
                <th>    </th>
                <th>5 KG</th>
                <th>15 KG</th>
                <th>50 KG</th>
            </tr>
            <tr>
                <th>5 KM</th>
            </tr>
            <tr>
                <th>15 KM</th>
            </tr>
            <tr>
                <th>50 KM</th>

            </tr>
        </thead>;
        const PriceListTemp = priceList.map(item => {
            return <thead key={item.id}>
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
        });

        return (
            <div>
                <Container fluid>
                    <br /><br /><br />
                    <h3>Price List:</h3>
                    <Table className="mt-4">
                        {priceList[0] ? PriceListTemp : PriceListEmpty}
                    </Table>
                </Container>
                <br /><br /><br />
                <FormGroup>
                    {priceList[0] ?
                        <Button color="primary" tag={Link} to="/priceList/update">Update Price List</Button> :
                        <Button style={{ width: '300px' }} color="primary" tag={Link} to="/priceList/new"><h3>New Price List</h3></Button>}
                </FormGroup>
            </div>
        );
    }
}

export default PriceList;