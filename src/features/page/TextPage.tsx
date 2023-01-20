import React from 'react';
import AnimatedPage from "./AnimatedPage";
import './TextPage.css';
import logoImage from "../../assets/logo.png";
import { Link } from 'react-router-dom';

export interface TextPageParams {
    children: React.ReactNode | React.ReactNode[];
}

const TextPage = ({children}: TextPageParams) => {
    return (
        <AnimatedPage className='text-page'>
            <Link to="/">
                <img className='logo' src={logoImage} alt='Trivia Nerds Logo'/>
            </Link>
            <div className='text-content'>
                {children}
            </div>
        </AnimatedPage>
    );
};

export default TextPage;
