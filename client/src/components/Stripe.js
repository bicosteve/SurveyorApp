import React, { Component } from 'react';
import StripeCheckOut from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Stripe extends Component {
    handleToken = (token, addresses) => {
        return this.props.postToken(token);
    };

    render() {
        const stripeKey =
            'pk_test_51Hrbc8DBAbQIuwUaTAIDVrYXZ4yKAaB3oxNLwa8nG5huyjDx8Zhjglqq9NZMVn7Fq3CTFTzhT2wlm2HonCdz6jwh00jDRp910w';
        return (
            <StripeCheckOut
                name='Observer!'
                description='Survey Credits'
                amount={500}
                token={this.handleToken}
                stripeKey={stripeKey}
                billingAddress
                shippingAddress>
                <button className='btn'>Add Credit</button>
            </StripeCheckOut>
        );
    }
}

//stripe test 4242 4242 4242 4242

export default connect(null, actions)(Stripe);
