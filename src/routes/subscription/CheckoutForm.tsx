import {CardElement, PaymentRequestButtonElement, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import React, {FormEvent, useEffect, useState} from "react";
import {useUser} from "../../app/hooks";
import {Button} from "../../features/framer/Button";
import {useHistory} from "react-router";
import {selectSubscriptionIntentType} from '../../slices/account/subscriptionSlice';
import {useSelector} from "react-redux";
import './Subscription.css';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const user = useUser();
    const history = useHistory();
    const intentType = useSelector(selectSubscriptionIntentType);

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        let response;
        if (intentType === 'payment') {
            response = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: `${process.env.REACT_APP_BASE_URL}`,
                    receipt_email: user && user.email || '',
                },
            });
        } else {
             response = await stripe.confirmSetup({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: `${process.env.REACT_APP_BASE_URL}`,
                },
            });
        }

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (response.error.type === "card_error" || response.error.type === "validation_error") {
            setMessage(response.error.message || '');
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsLoading(false);
    };

    function onSkipClick () {
        history.push(`/`);
    }

    return (
        <form className='payment-form' id="payment-form"  onSubmit={handleSubmit}>
            {/*<PaymentRequestButtonElement id="payment-request-button-element"  />*/}
            <label className='label'>Email:</label>
            <input
                className='input'
                id="email"
                type="text"
                value={user && user.email || ''}
                disabled={true}
            />
            <label className='label'>Card Details:</label>
            <PaymentElement id="card-element" className='payment-element' />
            <Button
                type='submit'
                borderRadius={30}
                defaultBackground="rgb(26, 255, 37)"
                defaultTextColor="rgb(20, 71, 0)"
                font={true}
                fontSize={26}
                hoverBackground="rgb(0, 189, 16)"
                padding={14}
                pressedBackground="rgb(72, 244, 92)"
                pressedTextColor="rgb(1, 70, 29)"
                text={`SUBSCRIBE`}
                whileHoverScale={1.1}
                whileTapScale={1.2}
                style={styles.mainButton}
            />
            <Button
                borderRadius={30}
                defaultBackground="#CC54CC"
                defaultTextColor="#ffffff"
                font={true}
                fontSize={22}
                hoverBackground="#a334a3"
                hoverTextColor="#000"
                padding={14}
                pressedBackground="#CC54CC"
                pressedTextColor="#ffffff"
                text="SKIP"
                whileHoverScale={1.1}
                whileTapScale={1.2}
                style={styles.skipButton}
                onClick={onSkipClick}
            />
            {/* Show any error or success messages */}
            {message && <div className="payment-message">{message}</div>}
        </form>
    );
};

const styles = {
    mainButton: {
        marginTop: 20,
        width: '100%',
    } as React.CSSProperties,
    skipButton: {
        marginTop: 20,
        width: '240px',
    } as React.CSSProperties,
};

export default CheckoutForm;
