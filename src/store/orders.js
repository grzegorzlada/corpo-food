export const orders = (state = [], action) => {
    switch (action.type) {
    case 'ADD_NEW_ORDER':
        return [
            ...state,
            action.order
        ];
    case 'HYDRATE_ORDERS':
        return action.orders;
    default:
        return state;
    }
};

export const activeOrder = (state = {}, action) => {
    switch (action.type) {
    case 'GET_ORDER':
        return action.activeOrder;
    default:
        return state;
    }
};
