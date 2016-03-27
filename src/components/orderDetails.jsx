import React from 'react';
import {connect} from 'react-redux';
import {getOrder} from '../store/ordersActions';
import {Row, Col, Label, Button} from 'react-bootstrap';
import OrderState from '../enums/orderState';
import {browserHistory} from 'react-router';

const OrderDetails = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        order: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired
    },

    componentDidMount () {
        this.props.dispatch(getOrder(this.props.params.id));
    },

    _dateToString (date) {
        if (!date) {
            return null;
        }
        const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${date.getHours()}:${minutes}`;
    },

    render () {
        const {order} = this.props;

        const stateStyle = (() => {
            switch (order.state) {
            case OrderState.Open: return 'primary';
            case OrderState.Ordered: return 'info';
            case OrderState.Delivered: return 'success';
            default: return 'danger';
            }
        })();

        return (
            <Row >
                <Col xs={12}>
                    <Button onClick={() => browserHistory.push('/')}>Go back to dashboard</Button>
                </Col>
                <Col xs={12}>
                    <h2>{order.restaurant} <Label bsStyle={stateStyle}>{order.state}</Label></h2>
                    <p>Zamawia {order.author}</p>
                    <p>Dedlajn: {this._dateToString(order.deadline)}</p>
                    <p>Na kiedy: {this._dateToString(order.deliveryTime)}</p>
                    <p>Menu: <a href={order.menu}>{order.menu}</a></p>
                    <p>Ekstra koszt per meal: {order.extraCostPerMeal}</p>
                    <p>Koszt deliweru: {order.deliveryCost}</p>
                    <div>
                        <h3>Opis</h3>
                        <p>{order.description}</p>
                    </div>
                </Col>
            </Row>
        );
    }
});

export default connect(
    state => ({order: state.activeOrder})
)(OrderDetails);
