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
        dispatch: React.PropTypes.func.isRequired
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
                validator: validateHour
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
                isDirty: false
            },
            passwordRepeat: {
                text: '',
                isValid: true,
                isDirty: false
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
                    this.invalidateProperty(propertyName);
                    isFormValid = false;
                }
                if (property.isValid === false) {
                    isFormValid = false;
                }
            }
        }

        return isFormValid;
    },

    invalidateProperty (propertyName) {
        this.setState(oldState => {
            oldState[propertyName] = {
                isValid: false,
                isDirty: oldState[propertyName].isDirty,
                text: oldState[propertyName].text,
                validator: oldState[propertyName].validator,
                required: oldState[propertyName].required
            };
        });
    },

    handleFieldChange (event, forcedValidState) {
        const value = event.target.value;
        const id = event.target.id;
        const isFilled = validateMinimalLength(value, 1);
        const isForcedValidState = typeof forcedValidState !== 'undefined';
        let isValid = isForcedValidState ? forcedValidState : true;

        if (!isForcedValidState && this.state[id].required === true) {
            isValid = isFilled;
        }

        if (!isForcedValidState && isFilled && typeof this.state[id].validator === 'function') {
            isValid = this.state[id].validator(value);
        }

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

    handlePasswordChange (event) {
        this.handleFieldChange(event, validateMinimalLength(event.target.value, 6));
    },

    handleConfirmPasswordChange (event) {
        this.handleFieldChange(event, event.target.value === this.state.password.text);
    },

    render () {
        return (
            <Row >
                <Col xs={8}>
                    <form>
                        <ValidatedInput
                            id="restaurant"
                            label="Lokal"
                            onChange={this.handleFieldChange}
                            placeholder="Lokal"
                            type="text"
                            validationMessage="Proszę podać lokal"
                            value={this.state.restaurant}
                        />
                        <ValidatedInput
                            id="deadline"
                            label="Zamawiam o"
                            onChange={this.handleFieldChange}
                            placeholder="O ktorej zamawiasz"
                            validationMessage="Podaj poprawna godzinę"
                            value={this.state.deadline}
                        />
                        <ValidatedInput
                            id="deliveryTime"
                            label="Zamawiam na"
                            onChange={this.handleFieldChange}
                            placeholder="Zamawiam na"
                            validationMessage="Podaj poprawna godzinę"
                            value={this.state.deliveryTime}
                        />
                        <ValidatedInput
                            id="menu"
                            label="Menu"
                            onChange={this.handleFieldChange}
                            placeholder="Menu"
                            type="text"
                            validationMessage="Proszę podać odnośnik do menu"
                            value={this.state.menu}
                        />
                        <Input
                            id="description"
                            label="Opis"
                            onChange={this.handleFieldChange}
                            placeholder="Opis"
                            type="textarea"
                        />
                        <ValidatedInput
                            id="password"
                            label="Hasło administracyjne"
                            onChange={this.handlePasswordChange}
                            placeholder="Hasło administracyjne"
                            type="password"
                            validationMessage="Minimalna długość hasła wynosi 6 znakow"
                            value={this.state.password}
                        />
                        <ValidatedInput
                            id="passwordRepeat"
                            label="Powtorz hasło"
                            onChange={this.handleConfirmPasswordChange}
                            placeholder="Powtorz hasło"
                            type="password"
                            validationMessage="Hasla nie sa takie same"
                            value={this.state.passwordRepeat}
                        />
                        <ValidatedInput
                            id="author"
                            label="Autor"
                            onChange={this.handleFieldChange}
                            placeholder="Adres e-mail"
                            type="text"
                            validationMessage="Proszę podać autora zamowienia"
                            value={this.state.author}
                        />
                        <ValidatedInput
                            addonAfter="zł"
                            id="deliveryCost"
                            label="Koszt dowozu"
                            onChange={this.handleFieldChange}
                            placeholder="Koszt dowozu"
                            type="text"
                            validationMessage="Podaj poprawny koszt dostawy"
                            value={this.state.deliveryCost}
                        />
                        <ValidatedInput
                            addonAfter="zł"
                            id="extraCostPerMeal"
                            label="Do każdego zamowienia"
                            onChange={this.handleFieldChange}
                            placeholder="PLN"
                            type="text"
                            validationMessage="Podaj poprawny koszt do kazdego zamowienia"
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

export default connect()(NewOrderForm);
