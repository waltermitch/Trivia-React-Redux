import React from 'react';
import {useLocation, useParams} from "react-router-dom";
import {AnimatePresence} from "framer";
import AccountMenu from "./AccountMenu";
import Register from "./Register";
import Login from "./Login";
import Account from './Account';
import './AccountSection.css';
import PrivateRoute from "../../features/page/PrivateRoute";
import Subscription from "../subscription/Subscription";
import Email from './Email';

export interface AccountSectionParam {
    name: string;
}

const AccountSection = () => {
    let {name} = useParams<AccountSectionParam>();

    // console.log('AccountSection')

    function getAccountPage (name: string) {
        switch (name) {
            case 'accountmenu':
                return <AccountMenu />
            case 'register':
                return <Register />
            case 'login':
                return <Login />
            case 'email':
                return <Email />
            case 'account':
                return (
                    <PrivateRoute>
                        <Account />
                    </PrivateRoute>
                )
        }
    }

    return (
        <div className='accounts-section'>
            <AnimatePresence exitBeforeEnter initial={false}>
                {getAccountPage(name)}
            </AnimatePresence>
        </div>
    );
};

export default AccountSection;
