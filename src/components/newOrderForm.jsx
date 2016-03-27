import React from 'react';
import {Button, Input, Row, Col} from 'react-bootstrap';
import ValidatedInput from './validatedInput';
import {connect} from 'react-redux';
import {addNewOrder} from '../store/ordersActions';
import {validateMinimalLength, validateUrl, validateHour, validateMoney} from './orderFormValidator';
import {browserHistory} from 'react-router';
import {mapOrderStateToOrder} from './orderMapper';

const NewOrderForm = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    getInitialState () {
        return {
            restaurant: {
                text: '',
                isValid: true,
                isDirty: false,
                required: true
            },
            deadline: {
                text: '',
                isValid: true,
                isDirty: false,
                validator: validateHour,
                required: true
            },
            deliveryTime: {
                text: '',
                isValid: true,
                isDirty: false,
                validator: validateHour,
                required: true
            },
            menu: {
                text: '',
                isValid: true,
                isDirty: false,
                validator: validateUrl,
                required: true
            },
            description: {
                text: ''
            },
            password: {
                text: '',
                isValid: true,
                isDirty: false,
                validator: this.validatePassword,
                required: true
            },
            passwordRepeat: {
                text: '',
                isValid: true,
                isDirty: false,
                validator: this.validateConfirmPassword,
                required: true
            },
            author: {
                text: '',
                isValid: true,
                isDirty: false,
                required: true
            },
            deliveryCost: {
                text: '',
                isValid: true,
                isDirty: false,
                required: true,
                validator: validateMoney
            },
            extraCostPerMeal: {
                text: '',
                isValid: true,
                isDirty: false,
                validator: validateMoney
            }
        };
    },

    handleSubmit () {
        if (this.validateEntireForm()) {
            this.props.dispatch(addNewOrder(mapOrderStateToOrder(this.state)));
            browserHistory.push('/');
        }
    },

    validateEntireForm () {
        let isFormValid = true;

        for (let propertyName in this.state) {
            if ({}.hasOwnProperty.call(this.state, propertyName)) {
                const property = this.state[propertyName];
                if (property.isValid === true && !property.isDirty) {
                    this.revalidateField(propertyName);
                    isFormValid = false;
                }
                if (property.isValid === false) {
                    isFormValid = false;
                }
            }
        }

        return isFormValid;
    },

    revalidateField (fieldName) {
        this.setState(oldState => {
            oldState[fieldName] = {
                isValid: this.validateField(fieldName, oldState[fieldName].text),
                isDirty: oldState[fieldName].isDirty,
                text: oldState[fieldName].text,
                validator: oldState[fieldName].validator,
                required: oldState[fieldName].required
            };
        });
    },

    validateField (id, value) {
        let isValid = true;
        const isFilled = validateMinimalLength(value, 1);
        if (this.state[id].required === true) {
            isValid = isFilled;
        }

        if (isFilled && typeof this.state[id].validator === 'function') {
            isValid = this.state[id].validator(value);
        }

        return isValid;
    },

    handleFieldChange (event) {
        const value = event.target.value;
        const id = event.target.id;
        const isValid = this.validateField(id, value);

        this.setState(oldState => {
            oldState[id] = {
                text: value,
                isValid: isValid,
                isDirty: true,
                validator: oldState[id].validator,
                required: oldState[id].required
            };
        });
    },

    validatePassword (value) {
        return validateMinimalLength(value, 6);
    },

    validateConfirmPassword (value) {
        return value === this.state.password.text;
    },

    render () {
        return (
            <Row >
                <Col xs={8}>
                    <form>
                        <ValidatedInput
                            id="restaurant"
                            label={this.props.resources.restaurant}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.restaurant}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideRestaurant}
                            value={this.state.restaurant}
                        />
                        <ValidatedInput
                            id="deadline"
                            label={this.props.resources.orderingAt}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.orderingAt}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideValidHour}
                            value={this.state.deadline}
                        />
                        <ValidatedInput
                            id="deliveryTime"
                            label={this.props.resources.deliveryAt}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.deliveryAt}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideValidHour}
                            value={this.state.deliveryTime}
                        />
                        <ValidatedInput
                            id="menu"
                            label={this.props.resources.menu}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.menu}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideMenuLink}
                            value={this.state.menu}
                        />
                        <Input
                            id="description"
                            label={this.props.resources.description}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.description}
                            type="textarea"
                        />
                        <ValidatedInput
                            id="password"
                            label={this.props.resources.password}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.password}
                            type="password"
                            validationMessage={this.props.resources.validationMessages.passwordTooShort}
                            value={this.state.password}
                        />
                        <ValidatedInput
                            id="passwordRepeat"
                            label={this.props.resources.passwordAgain}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.passwordAgain}
                            type="password"
                            validationMessage={this.props.resources.validationMessages.passwordsDontMatch}
                            value={this.state.passwordRepeat}
                        />
                        <ValidatedInput
                            id="author"
                            label={this.props.resources.author}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.author}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideAuthor}
                            value={this.state.author}
                        />
                        <ValidatedInput
                            addonAfter={this.props.resources.currency}
                            id="deliveryCost"
                            label={this.props.resources.deliveryCost}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.deliveryCost}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideValidDeliveryCost}
                            value={this.state.deliveryCost}
                        />
                        <ValidatedInput
                            addonAfter={this.props.resources.currency}
                            id="extraCostPerMeal"
                            label={this.props.resources.extraCostPerMeal}
                            onChange={this.handleFieldChange}
                            placeholder={this.props.resources.extraCostPerMeal}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideValidExtraCostPerMeal}
                            value={this.state.extraCostPerMeal}
                        />
                        <Button onClick={this.handleSubmit} type="button">
                            Save
                        </Button>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default connect(state => ({resources: state.localization.resources.newOrderForm}))(NewOrderForm);
