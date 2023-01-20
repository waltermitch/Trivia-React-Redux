import React from 'react';
import './Subscription.css';
import AnimatedPage from "../../features/page/AnimatedPage";
import {Elements} from '@stripe/react-stripe-js';
import {Appearance, Stripe, StripeElementsOptions} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import logoImage from "../../assets/logo.png";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectSecret} from '../../slices/account/subscriptionSlice'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export interface SubscriptionParams {
    stripePromise: Promise<Stripe|null>
}

const Subscription = ({stripePromise}: SubscriptionParams) => {
    let clientSecret = useSelector(selectSecret);

    if (!clientSecret) return (
        <AnimatedPage className='subscription-page'>
            <div className='content'>
                <p className='error-message' style={{marginTop: '10px'}}>{'Payment unavailable at the moment. Please try again later.'}</p>
            </div>
        </AnimatedPage>
    );

    const appearance: Appearance = {
        theme: 'stripe',

        variables: {
            borderRadius: '14px',
            spacingGridRow: '5px',
            // See all possible variables below
        }
    };
    const options: StripeElementsOptions = {
        clientSecret,
        appearance,
    };

    // console.log('clientSecret', clientSecret, 'stripePromise', stripePromise);

    return (
        <AnimatedPage className='subscription-page'>
            <div className='content'>
                <Link to="/">
                    <img className='logo' style={{marginTop: '50px'}} src={logoImage} alt='Trivia Nerds Logo'/>
                </Link>
                {clientSecret && stripePromise && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </AnimatedPage>
    );
};

export default Subscription;
