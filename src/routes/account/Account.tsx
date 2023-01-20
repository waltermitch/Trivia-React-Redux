import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import './Form.css';
import { Button } from "../../features/framer/Button";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useUser } from "../../app/hooks";
import starIcon from "../../assets/svg/star.svg";
import levelIcon from "../../assets/svg/level.svg";
import rankIcon from "../../assets/svg/rank.svg";
import './Account.css';
import { useHistory } from "react-router";
import { useChangePasswordMutation } from "../../app/services/user";
import LoaderOverlay from "../../features/page/LoaderOverlay";
import { toggleOpened } from "../../slices/account/menuSlice";
import { useDispatch } from "react-redux";
import { prepareHeaders } from "../../utils/prepareHeaders";
import AnimatedPage from "../../features/page/AnimatedPage";

interface IFormInputs {
    email: string
    old_password: string
    new_password: string
}

const schema = yup.object({
    email: yup.string().email(),
    old_password: yup.string()
        .required('No password provided.')
        .min(8, 'Password should be 8 chars minimum.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\:])/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    new_password: yup.string()
        .required('No password provided.')
        .min(8, 'Password should be 8 chars minimum.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\:])/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
}).required();

export default function Account() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });
    const user = useUser();
    const history = useHistory();
    const dispatch = useDispatch();
    const [cancelError, setCancelError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sendChangePassword, { isLoading: isChanging, error, data }] = useChangePasswordMutation();

    function goToSubscription() {
        history.push(`/plans`);
    }

    async function cancelSubscription() {
        setIsLoading(true);
        try {
            const result: any = await fetch(`${process.env.REACT_APP_BASE_URL}subscriptions/cancel_subscription`, {
                method: 'POST',
                headers: prepareHeaders(new Headers()),
            });

            if (result.error) {
                setCancelError(result.error);
                return;
            }

            history.push(`/cancelation`);
        } catch (e) {
            setCancelError('Unable to cancel at the moment. Please try again later.');
            setIsLoading(false);
        }
    }

    const onSubmit = (data: IFormInputs) => {
        if (user && user.email) {
            //@ts-ignore
            sendChangePassword({
                email: user.email,
                password: data.old_password,
                new_password: data.new_password
            });
        }
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
                <div className='account-user-info'>
                    <div className='tokens'>
                        <img src={starIcon} alt='Tokens Icon' />
                        <span style={{ marginTop: 5 }}>Tokens: {user && user.tokens || 0}</span>
                    </div>
                    <div className='level'>
                        <img src={levelIcon} alt='Level Icon' />
                        <span style={{ marginTop: 5 }}>Level: {user && user.current_level || 0}</span>
                    </div>
                    <div className='rank'>
                        <img src={rankIcon} alt='Rank Trophy' />
                        <span style={{ marginTop: 5 }}>Rank: {user && user.rank || ''}</span>
                    </div>
                </div>
                <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
                    <label className='label'>Email:</label>
                    <div className='input-with-icon'>
                        <input type="email"
                            disabled={true}
                            placeholder={(user && user.email) || 'example@example.com'}
                            className={`input ${errors.email ? 'error' : ''}`}
                            {...register("email")} />
                    </div>
                    <p className='error-message'>{errors.email?.message}</p>

                    <label className='label' style={{ marginTop: '5px' }}>Old Password:</label>
                    <div className='input-with-icon'>
                        <input type="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            className={`input ${errors.old_password ? 'error' : ''}`}
                            {...register("old_password")} />
                    </div>
                    <p className='error-message'>{errors.old_password?.message}</p>

                    <label className='label' style={{ marginTop: '5px' }}>New Password:</label>
                    <div className='input-with-icon'>
                        <input type="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            className={`input ${errors.new_password ? 'error' : ''}`}
                            {...register("new_password")} />
                    </div>
                    <p className='error-message'>{errors.new_password?.message}</p>


                    <Button
                        type='submit'
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
                        text="CHANGE THE PASSWORD"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.topButton}
                    />
                    {(error || (data && data.error) || cancelError) && <p className='error-message' style={{ marginTop: '10px', marginBottom: '10px' }}>{error || (data && data.error) || cancelError}</p>}
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
                        text={user && user.subscription_ends ? `SUBSCRIBED ${user.subscription_plan === 'monthly' ? 'Monthly Plan $5.99' : 'Yearly Plan $35.88'}` : "REMOVE ADS"}
                        disabled={user && user.subscription_ends}
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={user && user.subscription_ends ? styles.topButton : styles.bottomButton}
                        onClick={goToSubscription}
                    />
                    {user && user.subscription_ends && <Button
                        borderRadius={30}
                        defaultBackground="rgb(26, 255, 37)"
                        defaultTextColor="rgb(20, 71, 0)"
                        font={true}
                        fontSize={22}
                        hoverBackground="rgb(0, 189, 16)"
                        padding={10}
                        pressedBackground="rgb(72, 244, 92)"
                        pressedTextColor="rgb(1, 70, 29)"
                        text="CANCEL THE SUBSCRIPTION"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.bottomButton}
                        onClick={cancelSubscription}
                    />}
                </form>
            </div>
            {(isChanging || isLoading) && <LoaderOverlay />}
        </AnimatedPage>
    );
}

const styles = {
    topButton: {
        marginTop: 20,
        width: '100%',
    } as React.CSSProperties,
    bottomButton: {
        marginTop: 20,
        marginBottom: 50,
        width: '100%',
    } as React.CSSProperties,
};
