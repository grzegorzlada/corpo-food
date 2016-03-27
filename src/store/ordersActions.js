import OrderState from '../enums/orderState';
import {mapHourToDate} from '../services/dateManipulation';

export function addNewOrder (order) {
    return dispatch => {
        fetch('/api/orders', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(response => response.json())
        .then(data => {
            const newOrder = {
                id: data.id,
                deadline: mapHourToDate(order.deadline.hour),
                hungryGuysCount: 0,
                author: order.author,
                restaurant: order.restaurant,
                state: OrderState.Open
            };
            dispatch({type: 'ADD_NEW_ORDER', order: newOrder});
        })
        .catch(error => {
            console.log(error);
        });
    };
}

export function hydrateOrders (orders) {
    return {
        type: 'HYDRATE_ORDERS',
        orders
    };
}

export function getOrder (id) {
    return dispatch => {
        fetch(`/api/orders/${id}`)
            .then(response => response.json())
            .then(order => {
                const activeOrder = Object.assign(order, {
                    deadline: new Date(order.deadline),
                    deliveryTime: new Date(order.deliveryTime)
                });
                dispatch({type: 'GET_ORDER', activeOrder});
            })
            .catch(error => {
                console.log(error)
            });
    };
}
