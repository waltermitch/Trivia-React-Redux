import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import Progression from "./routes/progression/Progression";
import Quiz from "./routes/quiz/Quiz";
import { AnimatePresence } from "framer";
import Result from "./routes/result/Result";
import PrivacyPolicy from "./routes/privacy-policy/PrivacyPolicy";
import TermsOfService from "./routes/terms-of-service/TermsOfService";
import Dmca from "./routes/dmca/Dmca";
import Footer from "./features/page/Footer";
import Contact from "./routes/contact/Contact";
import Subscription from "./routes/subscription/Subscription";
import PrivateRoute from "./features/page/PrivateRoute";
import { Squash as Hamburger } from 'hamburger-react'
import { useDispatch, useSelector } from "react-redux";
import { selectMenuOpened, toggleOpened } from "./slices/account/menuSlice";
import { useHistory } from "react-router";
import { loadStripe } from '@stripe/stripe-js';
import Completion from "./routes/subscription/Completion";
import Plans from "./routes/subscription/Plans";
import PrivateSubscriptionRoute from "./features/page/PrivateSubscriptionRoute";
import Cancelation from "./routes/subscription/Cancelation";
import AccountMenu from "./routes/account/AccountMenu";
import Register from "./routes/account/Register";
import Login from './routes/account/Login';
import Email from './routes/account/Email';
import Account from "./routes/account/Account";
import { useGetAdsConfigQuery } from "./app/services/ads";
import Helmet from 'react-helmet';
import { createDefaultSlots } from './slices/quiz/answerSlice';
import { generateDefultSlotsList } from './features/framer/utils/propUtils';
import { useQuiz, useSlots } from './app/hooks';

const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_KEY}`
);

function App() {
    const location = useLocation();

    let menuOpened = useSelector(selectMenuOpened);
    const dispatch = useDispatch();
    const history = useHistory();
    const { data: adsData, refetch: refreshAds } = useGetAdsConfigQuery();
    const pushedSlots = useSlots();
    const currQuiz = useQuiz()
    // console.log(pushedSlots)


    React.useEffect(() => {
        currQuiz === undefined && refreshAds();
    }, [])

    React.useEffect(() => {
        if (adsData) {
            // @ts-ignore
            let adsKeys = Object.keys(adsData);
            if (adsKeys.length > 0) {
                const slotsList = generateDefultSlotsList(adsKeys, pushedSlots)

                // console.log("App Initialize Slot :: ",slotsList)
                dispatch(createDefaultSlots(slotsList))
            }
        }
    }, [adsData])

    /*
        const subscriptionEnabledState = useSubscriptionEnabled();
        const query = new URLSearchParams(window.location.search);
        const subscriptionEnabled = query.get('subscriptionEnabled');
        if (!subscriptionEnabledState && subscriptionEnabled) {
            dispatch(toggleSubscription(true));
        }
    */

    function onToggled(toggled: boolean) {
        if (toggled) history.push(`/account`);
        else history.push(`/quiz`);
        dispatch(toggleOpened(toggled));
    }

    const paths = location.pathname.split('/');
    return (
        <div className="App">
            {adsData && <Helmet script={[{
                type: 'text/javascript',
                innerHTML: adsData.header_scripts.code
            }]} />}
            <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={paths[1]}>
                    <Route exact path="/">
                        <Progression />
                    </Route>
                    <Route exact path="/quiz/:quizId?/:questionId?">
                        <Quiz adsData={adsData} />
                    </Route>
                    <Route exact path="/result">
                        <Result />
                    </Route>
                    <Route exact path="/privacy-policy">
                        <PrivacyPolicy />
                    </Route>
                    <Route exact path="/terms-of-service">
                        <TermsOfService />
                    </Route>
                    <Route exact path="/dmca">
                        <Dmca />
                    </Route>
                    <Route exact path="/contactus">
                        <Contact />
                    </Route>
                    <Route exact path="/completion">
                        <Completion stripePromise={stripePromise} />
                    </Route>
                    <Route exact path="/cancelation">
                        <Cancelation />
                    </Route>
                    <PrivateSubscriptionRoute exact path="/plans">
                        <Plans />
                    </PrivateSubscriptionRoute>
                    <PrivateSubscriptionRoute exact path="/subscribe">
                        <Subscription stripePromise={stripePromise} />
                    </PrivateSubscriptionRoute>
                    <Route exact path="/accountmenu">
                        <AccountMenu />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/log-in">
                        <Login />
                    </Route>
                    <Route exact path="/email">
                        <Email />
                    </Route>
                    <PrivateRoute exact path="/account">
                        <Account />
                    </PrivateRoute>
                </Switch>
            </AnimatePresence>
            <Footer />
            {
                (location.pathname.indexOf('plans') === -1 && location.pathname.indexOf('subscribe') === -1) &&
                <div className='hamburger-toggle'>
                    <Hamburger toggled={menuOpened} onToggle={onToggled} rounded color='white' size={64} distance='sm' />
                </div>
            }
        </div>
    );
}

export default App;
