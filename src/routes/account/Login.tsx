import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import './Form.css';
import './Account.css';
import { Button } from "../../features/framer/Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useLoginMutation } from "../../app/services/user";
import LoaderOverlay from "../../features/page/LoaderOverlay";
import { useHistory } from "react-router";
import { toggleOpened } from "../../slices/account/menuSlice";
import { useDispatch } from "react-redux";
import { useUser } from "../../app/hooks";
import AnimatedPage from "../../features/page/AnimatedPage";

interface IFormInputs {
    email: string
    password: string
}

const schema = yup.object({
    email: yup.string().email(),
    password: yup.string()
        .required('No password provided.')
        .min(8, 'Password should be 8 chars minimum.')
}).required();

export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useUser();

    // console.log(user)
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            email: user && (user.email || '')
        },
        resolver: yupResolver(schema)
    });

    const [sendLogin, { isLoading: isLoggingIn, error, data }] = useLoginMutation();

    const onSubmit = (data: IFormInputs) => {
        sendLogin({
            email: data.email,
            password: data.password,
            utm_campaign: user && user.utm_campaign || '',
            utm_source: user && user.utm_source || ''
        });
    };

    if (data && data.success) {
        dispatch(toggleOpened(false));
        history.push(`/quiz`);
    }

    return (
        <AnimatedPage className='account-page' >
            <div className='content'>
                <Link to="/">
                    <img className='logo' src={logoImage} alt='Trivia Nerds Logo' />
                </Link>
                <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
                    <label className='label'>Email:</label>
                    <input type="email"
                        placeholder="Enter your email address..."
                        className={`input ${errors.email ? 'error' : ''}`}
                        {...register("email")} />
                    <p className='error-message'>{errors.email?.message}</p>

                    <label className='label'>Password:</label>
                    <input type="password"
                        placeholder="Enter your password..."
                        className={`input ${errors.password ? 'error' : ''}`}
                        {...register("password")} />
                    <p className='error-message'>{errors.password?.message}</p>

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
                        text="LOGIN"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.mainButton}
                    />
                    {(error || (data && data.error)) && <p className='error-message' style={{ marginTop: '10px' }}>{error || (data && data.error)}</p>}
                    <div className='bottom-message'>If you don't already have one&nbsp;
                        <NavLink to={{
                            pathname: `/register`,
                        }} activeClassName="selected" style={{ color: '#00DEFF' }}>
                            Create an account here
                        </NavLink>
                    </div>
                </form>
            </div>
            {isLoggingIn && <LoaderOverlay />}
        </AnimatedPage>
    );
}

const styles = {
    mainButton: {
        marginTop: 20,
        width: '100%',
    } as React.CSSProperties,
    skipButton: {
        marginBottom: 60,
        width: 300,
    } as React.CSSProperties,
};
