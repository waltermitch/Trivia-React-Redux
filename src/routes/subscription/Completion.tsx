import React, { ReactElement, useEffect, useState } from 'react';
import './Subscription.css'
import AnimatedPage from "../../features/page/AnimatedPage";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { SubscriptionParams } from "./Subscription";
import { Button } from "../../features/framer/Button";
import { useHistory } from "react-router";
import { useGetUserQuery, useGetLvlDataQuery, useGetRankQuery } from "../../app/services/user";
import { toggleOpened } from "../../slices/account/menuSlice";
import { useDispatch } from "react-redux";
import { useUser } from '../../app/hooks';

function Completion(props: SubscriptionParams) {
    const [messageBody, setMessageBody] = useState<string | ReactElement>('');
    const { stripePromise } = props;
    const history = useHistory();

    const userStore = useUser();
    const isSearchParams = window.location?.search

    const queryParam = isSearchParams ? window.location.search.substring(1) : '';
    const serializeParams = (userStore?.utm_campaign && userStore.utm_source) ? {
        utm_campaign: userStore?.utm_campaign,
        utm_source: userStore.utm_source
    } : (userStore?.utm_campaign) ? {
        utm_campaign: userStore?.utm_campaign,
    } : (userStore?.utm_source) ? {
        utm_source: userStore?.utm_source,
    } : isSearchParams ? Object.fromEntries(new URLSearchParams(queryParam)) :
        {}

    const { data: user, isLoading, refetch: refetchUser } = useGetUserQuery(serializeParams);
    // const { } = useGetLvlDataQuery();
    // const { } = useGetRankQuery()
    const dispatch = useDispatch();

    useEffect(() => {
        if (!stripePromise) return;

        stripePromise.then(async (stripe) => {
            if (!stripe) return;

            console.log('window.location.pathname', window.location.search);
            const query = new URLSearchParams(window.location.search);
            const clientSecret = query.get('payment_intent_client_secret');
            if (clientSecret) {
                const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
                setMessageBody(error ? `${error.message}` : (
                    <>Payment {paymentIntent && paymentIntent.status}:
                        <br />
                        <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent && paymentIntent.id}`} target="_blank" rel="noreferrer">
                            {paymentIntent && paymentIntent.id}
                        </a>
                    </>
                ));

                refetchUser();
            }
        });
    }, [stripePromise]);

    function onSkipClick() {
        if (!user || !user.registered_with_password) {
            history.push(`/register`);
        } else if (user && !user.logged_with_password) {
            history.push(`/log-in`);
        } else {
            history.push(`/`);
            dispatch(toggleOpened(false));
        }

    }

    return (
        <AnimatedPage className='completion-page'>
            <div className='content'>
                <Link to="/">
                    <img className='logo' src={logoImage} alt='Trivia Nerds Logo' />
                </Link>
                <h1 className='completion-title'>You have successfully subscribed! Thank you!</h1>
                {/*<div className='completion-message' id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>*/}
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
                    text="CONTINUE"
                    whileHoverScale={1.1}
                    whileTapScale={1.2}
                    style={styles.skipButton}
                    onClick={onSkipClick}
                />
            </div>
        </AnimatedPage>
    );
}

const styles = {
    skipButton: {
        marginTop: 20,
        width: '240px',
    } as React.CSSProperties,
};

export default Completion;
