import React, {useState} from 'react';
import './Subscription.css';
import AnimatedPage from "../../features/page/AnimatedPage";
import logoImage from "../../assets/logo.png";
import {Link} from "react-router-dom";
import Plan from './Plan';
import {useHistory} from "react-router";
import {Button} from "../../features/framer/Button";
import {setSecret, setIntentType} from '../../slices/account/subscriptionSlice'
import {useDispatch} from "react-redux";
import {prepareHeaders} from "../../utils/prepareHeaders";
import {useUser} from "../../app/hooks";
import checkSVG from '../../assets/svg/Check.svg'
import ribbonSVG from '../../assets/svg/RemRebb.svg'
import starSVG from '../../assets/svg/star.svg'
import {toggleOpened} from "../../slices/account/menuSlice";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export interface PlansParams {
}

export interface PlanObject {
    type: string,
    priceId: string,
    price: string,
}

const plans = [
    {
        type: 'monthly',
        priceId: 'price_1KeegwGZMzqmdqgYeJd0qB4b',
        price: '$5.99/month'
    },
    {
        type: 'yearly',
        priceId: 'price_1KeegwGZMzqmdqgYIFTsCacN',
        price: '$35.88/year ($2.99/month)'
    }
]

const Plans = () => {
    const history = useHistory();
    const user = useUser();
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    async function selectSubscription  (plan: PlanObject) {
        if (!user) return;

        console.log('user', user);

        try {
            if (!user.customer_id) {
                const response: any = await fetch(`${process.env.REACT_APP_BASE_URL}subscriptions/create_customer`, {
                    method: 'POST',
                    headers: prepareHeaders(new Headers()),
                });

                const result = await response.json();
                console.log('create_customer', result);

                if (result.error) {
                    //setError(result.error);
                }
            }

            try {
                const response:any  = await fetch(`${process.env.REACT_APP_BASE_URL}subscriptions/create_subscription?product=${plan.type}`, {
                    method: 'POST',
                    headers: prepareHeaders(new Headers()),
                });

                const result = await response.json();

                console.log('create_subscription', result);

                if (result.error) {

                    try {
                        const response: any = await fetch(`${process.env.REACT_APP_BASE_URL}subscriptions/get_subscription`, {
                            method: 'POST',
                            headers: prepareHeaders(new Headers()),
                        });

                        const result = await response.json();

                        console.log('get_subscription', result);

                        if (result.error) {
                            setError(result.error);
                            return;
                        }

                        dispatch(setSecret(result.client_secret));
                        dispatch(setIntentType(result.intent_type));
                        history.push(`/subscribe`);
                    } catch (e) {
                        console.log('selectSubscription error', e);
                        setError('Payment unavailable at the moment. Please try again later.');
                    }

                    return;
                }

                dispatch(setSecret(result.client_secret));
                dispatch(setIntentType(result.intent_type));
                history.push(`/subscribe`);
            } catch (e) {
                console.log('selectSubscription error', e);
                setError('Payment unavailable at the moment. Please try again later.');
            }
        } catch (e) {
            console.log('selectSubscription error', e);
            setError('Payment unavailable at the moment. Please try again later.');
        }
    }

    function createPlan (plan: PlanObject) {
        return (
            <Plan key={plan.priceId} plan={plan} onSelect={selectSubscription} />
        )
    }

    function onSkipClick () {
        history.push(`/`);
        dispatch(toggleOpened(false));
    }

    return (
        <AnimatedPage className='subscription-page'>
            <div className='content'>
                <img style={{width: '96px', height: '96px', marginTop: '50px'}} src={checkSVG}/>
                <div className="plans-ribbon">
                    <img src={ribbonSVG}/>
                    <span>Remove Ads for 14 Days for FREE</span>
                </div>
                <div className='plans-benefits'>
                    <div className="plans-benefit">
                        <img style={{width: '46px', height: '46px'}} src={starSVG}/><span>NO Ads. Just Pure Quiz Goodness.</span>
                    </div>
                    <div className="plans-benefit">
                        <img style={{width: '46px', height: '46px'}} src={starSVG}/><span>FREE Power Ups and Tokens.</span>
                    </div>
                    <div className="plans-benefit">
                        <img style={{width: '46px', height: '46px'}} src={starSVG}/><span>Back Up and Save Your Quiz History.</span>
                    </div>
                    <div className="plans-benefit">
                        <img style={{width: '46px', height: '46px'}} src={starSVG}/><span>Compete, Win and Brag About Your Trivia Prowess.</span>
                    </div>
                </div>
                <p className='title'>Pick your plan:</p>
                {
                    plans.map(createPlan)
                }
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
                {error  && <p className='error-message' style={{marginTop: '10px'}}>{error}</p>}
            </div>
        </AnimatedPage>
    );
};

const styles = {
    skipButton: {
        marginTop: 20,
        width: '240px',
    } as React.CSSProperties,
};

export default Plans;
