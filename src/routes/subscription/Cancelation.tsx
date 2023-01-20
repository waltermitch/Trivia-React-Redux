import React, {ReactElement, useEffect, useState} from 'react';
import './Subscription.css'
import AnimatedPage from "../../features/page/AnimatedPage";
import {Link} from "react-router-dom";
import logoImage from "../../assets/logo.png";
import {SubscriptionParams} from "./Subscription";
import {Button} from "../../features/framer/Button";
import {useHistory} from "react-router";
import {toggleOpened} from "../../slices/account/menuSlice";
import {useDispatch} from "react-redux";

function Completion() {
    const [ messageBody, setMessageBody ] = useState<string|ReactElement>('');
    const history = useHistory();
    const dispatch = useDispatch();

    function onSkipClick () {
        history.push(`/quiz`);
        dispatch(toggleOpened(false));
    }

    return (
        <AnimatedPage className='completion-page'>
            <div className='content'>
                <Link to="/">
                    <img className='logo' src={logoImage} alt='Trivia Nerds Logo'/>
                </Link>
                <h1 className='completion-title'>Sorry to see you go!</h1>
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
                    text="GO BACK"
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
