import React from 'react'
import Styles from './styles'
import { Form, Field } from 'react-final-form'
import Card from './card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'
import styled from 'styled-components'
import { colors } from '../../pallette'

const Text = styled.div`
font-size: 2rem;
background: ${colors.browny};
padding: 1rem;
`
const Payment = ({ onPayment, amount,allowCash }) => {
    
    const onSubmit = values => {
        onPayment(JSON.stringify(values, 0, 2))
    }
    
    return (
        <Styles>
            <Text>Making Payement for ${amount}</Text>
            <Form
                onSubmit={onSubmit}
                render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
                    active
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Card
                                number={values.number || ''}
                                name={values.name || ''}
                                expiry={values.expiry || ''}
                                cvc={values.cvc || ''}
                                focused={active}
                            />
                            <div>
                                <Field
                                    name="number"
                                    component="input"
                                    type="text"
                                    pattern="[\d| ]{16,22}"
                                    placeholder="Card Number"
                                    format={formatCreditCardNumber}
                                />
                            </div>
                            <div>
                                <Field
                                    name="name"
                                    component="input"
                                    type="text"
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <Field
                                    name="expiry"
                                    component="input"
                                    type="text"
                                    pattern="\d\d/\d\d"
                                    placeholder="Valid Thru"
                                    format={formatExpirationDate}
                                />
                                <Field
                                    name="cvc"
                                    component="input"
                                    type="password"
                                    pattern="\d{3,4}"
                                    placeholder="CVC"
                                    format={formatCVC}
                                />
                            </div>
                            <div className="buttons">
                                <button type="submit" disabled={submitting}>
                                    Make Payment
                                </button>
                                {allowCash&&<button type="submit" disabled={submitting}>
                                    Record Cash Payment
                                </button>}
                            </div>
                            
                        </form>
                    )
                }}
            />
        </Styles>
    )
}

export default Payment;