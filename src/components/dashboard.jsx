import React from 'react';
import {Row, Alert} from 'react-bootstrap';
import OrderTile from './orderTile';
import {connect} from 'react-redux';
import {hydrateOrders} from '../store/ordersActions';

const Dashboard = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        orders: React.PropTypes.array.isRequired
    },

    componentWillMount () {

        const mockedOrders = [
            {
                id: 1,
                restaurant: 'hello',
                deliveryTime: new Date(),
                orderer: 'Andrzej',
                hungryGuysCount: 4
            },
            {
                id: 2,
                restaurant: 'this is not today',
                deliveryTime: new Date(2010, 10, 11, 12, 12, 12),
                orderer: 'Elo',
                hungryGuysCount: 2
            }
        ];

        const orders = mockedOrders;

        const ordersToday = orders.filter((order) => {
            const today = new Date();
            return today.getFullYear() === order.deliveryTime.getFullYear() &&
                today.getMonth() === order.deliveryTime.getMonth() &&
                today.getDate() === order.deliveryTime.getDate();
        });

        this.props.dispatch(hydrateOrders(ordersToday));
    },

    _renderOrderTiles () {
        return this.props.orders.map((order) => {
            return <OrderTile key={order.id} {...order} />;
        });
    },

    _getDashboardStyles () {
        return {
            marginTop: '1em'
        };
    },

    render () {
        const noNoticesYet = this.props.orders.length ?
            null : <Alert bsStyle="warning">Nikt jeszcze nie sfokusował się na czelendża - bądź pierwszy</Alert>;

        return (
            <div className="Dashboard" style={this._getDashboardStyles()}>
                {noNoticesYet}
                <Row>
                    {this._renderOrderTiles()}
                </Row>
            </div>
        );
    }
});

const ConnectedDashboard = connect(
    (state) => ({orders: state.orders})
)(Dashboard);

export default ConnectedDashboard;
