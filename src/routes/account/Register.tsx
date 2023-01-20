import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import './Form.css';
import './Account.css';
import { Button } from "../../features/framer/Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useRegisterMutation } from "../../app/services/user";
import LoaderOverlay from "../../features/page/LoaderOverlay";
import { useHistory } from "react-router";
import { toggleOpened } from "../../slices/account/menuSlice";
import { useDispatch } from "react-redux";
import { useUser } from "../../app/hooks";
import AnimatedPage from "../../features/page/AnimatedPage";

interface IFormInputs {
    email: string
    password: string
    confirmPassword: string
    privacyPolicy: boolean
}

const schema = yup.object({
    email: yup.string().email(),
    password: yup.string()
        .required('No password provided.')
        .min(8, 'Password should be 8 chars minimum.'),
    confirmPassword: yup.string()
        .required()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    privacyPolicy: yup.boolean()
        .oneOf([true], 'You must accept the Privacy Policy'),
}).required();

export default function Register() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            email: user && (user.email || ''),
            privacyPolicy: true,
        },
        resolver: yupResolver(schema)
    });

    const [sendRegister, { isLoading: isRegistering, error, data }] = useRegisterMutation();

    const onSubmit = (data: IFormInputs) => {

        //@ts-ignore
        sendRegister({
            email: data.email,
            password: data.password,
            utm_campaign: user && user.utm_campaign || '',
            utm_source: user && user.utm_source || ''
        });
    };

    if (data && data.success) {
        history.push(`/quiz`);
        dispatch(toggleOpened(false));
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

                    <label className='label' style={{ marginTop: '5px' }}>Confirm password:</label>
                    <input type="password"
                        placeholder="Enter your password again..."
                        className={`input ${errors.confirmPassword ? 'error' : ''}`}
                        {...register("confirmPassword")} />
                    <p className='error-message'>{errors.confirmPassword?.message}</p>
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
                        text="REGISTER"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.mainButton}
                    />
                    <div className='bottom-message'>If you already have an account go to the&nbsp;
                        <NavLink to={{
                            pathname: `/log-in`,
                        }} activeClassName="selected" style={{ color: '#00DEFF' }}>
                            Login
                        </NavLink>
                        &nbsp;page
                    </div>
                    <div className="checkbox-container" style={{ marginBottom: '50px' }}>
                        <input type="checkbox" className="input-checkbox" id="scales" {...register("privacyPolicy")} />
                        <label className='label-checkbox'>Yes! I'd like to receive email from TriviaNerds.com including chances to win and offers. I know I can unsubscribe at any time.&nbsp;
                            <NavLink to="/privacy-policy" activeClassName="selected" style={{ color: '#00DEFF' }}>
                                Privacy Policy
                            </NavLink>
                        </label>
                    </div>
                    <p className='error-message'>{errors.privacyPolicy?.message}</p>
                    {(error || (data && data.error)) && <p className='error-message' style={{ marginTop: '10px' }}>{error || (data && data.error)}</p>}
                </form>
            </div>
            {isRegistering && <LoaderOverlay />}
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
