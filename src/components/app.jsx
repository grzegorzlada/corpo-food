import React from 'react';
import DOM from 'react-dom';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import Dashboard from './dashboard';
import NewOrderForm from './newOrderForm';
import OrderDetails from './orderDetails';
import {orders, activeOrder} from '../store/orders';
import localization from '../store/localization';
import changeLocale from '../store/localizationActions';

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        orders,
        activeOrder,
        routing: routerReducer,
        localization
    }),
    applyMiddleware(thunkMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

const App = connect(state => ({resources: state.localization.resources.app}))(
    React.createClass({
        propTypes: {
            children: React.PropTypes.object,
            resources: React.PropTypes.object.isRequired
        },

        render () {
            return (
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>
                                {this.props.resources.appName}
                                <small>{this.props.resources.uniqueValueProposition}</small>
                            </PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            );
        }
    })
);

const renderApp = () => {
    DOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route component={App} path="/">
                    <IndexRoute component={Dashboard} />
                    <Route component={NewOrderForm} path="newOrder" />
                    <Route component={OrderDetails} path="order/:id" />
                </Route>
            </Router>
        </Provider>,
        document.getElementById('main-container')
    );
};

fetch('/api/currentLocale')
    .then(response => response.json())
    .then(locale => {
        store.dispatch(changeLocale(locale));
        renderApp();
    });
