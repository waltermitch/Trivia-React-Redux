import React, {useEffect, useState} from "react";
import './Form.css';
import './Account.css';
import {Button} from "../../features/framer/Button";
import {Link, useLocation, useRouteMatch} from "react-router-dom";
import logoImage from "../../assets/logo.png";
import {useHistory} from "react-router";
import AnimatedPage from "../../features/page/AnimatedPage";

export default function AccountMenu() {
    const history = useHistory();
    let { path, url } = useRouteMatch();
    const location = useLocation();
    const background = location.state && (location.state as { background: any }).background;

    function onLoginClick () {
        history.push(`/log-in`, {background: background || location});
    }

    function onRegisterClick () {
        history.push(`/register`, {background: background || location});
    }

    return (
        <AnimatedPage className='account-page' >
            <div className='content'>
                <Link to="/">
                    <img className='logo' src={logoImage} alt='Trivia Nerds Logo'/>
                </Link>
                <div className='contact-form'>
                    <Button
                        borderRadius={30}
                        defaultBackground="rgb(26, 255, 37)"
                        defaultTextColor="rgb(20, 71, 0)"
                        font={true}
                        fontSize={22}
                        hoverBackground="rgb(0, 189, 16)"
                        padding={10}
                        pressedBackground="rgb(72, 244, 92)"
                        pressedTextColor="rgb(1, 70, 29)"
                        text="LOGIN"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.loginButton}
                        onClick={onLoginClick}
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
                        text="REGISTER"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.registerButton}
                        onClick={onRegisterClick}
                    />
                </div>
            </div>
        </AnimatedPage>
    );
}

const styles = {
    loginButton: {
        marginTop: 20,
        width: '100%',
    } as React.CSSProperties,
    registerButton: {
        marginTop: 20,
        marginBottom: '50px',
        width: '100%',
    } as React.CSSProperties,
};
