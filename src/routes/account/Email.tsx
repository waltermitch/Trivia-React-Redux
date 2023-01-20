import React, {useState} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import './Form.css';
import './Account.css';
import {Button} from "../../features/framer/Button";
import {Link, NavLink, useLocation} from "react-router-dom";
import logoImage from "../../assets/logo.png";
import LoaderOverlay from "../../features/page/LoaderOverlay";
import {useHistory} from "react-router";
import {toggleOpened} from "../../slices/account/menuSlice";
import {useDispatch} from "react-redux";
import {useUser} from "../../app/hooks";
import {prepareHeaders} from "../../utils/prepareHeaders";
import AnimatedPage from "../../features/page/AnimatedPage";

interface IFormInputs {
    email: string
    privacyPolicy: boolean
}

const schema = yup.object({
    email: yup.string().email(),
    privacyPolicy: yup.boolean()
        .oneOf([true], 'You must accept the Privacy Policy'),
}).required();

export default function Login() {
    const location = useLocation();
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
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const background = location.state && (location.state as { background: any }).background;
    const from = location.state && (location.state as { from: any }).from;

    async function onSubmit (data: IFormInputs) {
        setIsLoading(true);
        try {
            const response:any  = await fetch(`${process.env.REACT_APP_BASE_URL}api/add_email?email=${encodeURIComponent(data.email)}`, {
                method: 'POST',
                headers: prepareHeaders(new Headers()),
            });

            const result = await response.json();

            // console.log('result', result);

            if (result.error) {
                setSubmitError(result.error);
                setIsLoading(false);
                return;
            }
            history.push(from || `/plans`, { background: background || location });
        } catch (e) {
            setSubmitError('Unable to submit the email. Please try again later.');
            setIsLoading(false);
        }
    }

    function onSkipClick () {
        history.push(`/quiz`);
        dispatch(toggleOpened(false));
    }

    return (
        <AnimatedPage className='account-page' >
            <div className='content'>
                <Link to="/">
                    <img className='logo' src={logoImage} alt='Trivia Nerds Logo'/>
                </Link>
                <h1 className='form-title'>Enter Your Email to Save Your Progress</h1>
                <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
                    <label className='label'>Email:</label>
                    <input type="email"
                           placeholder="Enter your email address..."
                           className={`input ${errors.email? 'error' : ''}`}
                           {...register("email")} />
                    <p className='error-message'>{errors.email?.message}</p>

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
                        text="Save My Progress"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.mainButton}
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
                        text="Skip For Now"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.skipButton}
                        onClick={onSkipClick}
                    />
                    <div className="checkbox-container">
                        <input type="checkbox" className="input-checkbox" id="scales" {...register("privacyPolicy")} />
                        <label className='label-checkbox'>Yes! I'd like to receive email from TriviaNerds.com including chances to win and offers. I know I can unsubscribe at any time.&nbsp;
                            <NavLink to="/privacy-policy" activeClassName="selected" style={{color: '#00DEFF'}}>
                                Privacy Policy
                            </NavLink>
                        </label>
                    </div>
                    <p className='error-message'>{errors.privacyPolicy?.message}</p>
                    {submitError  && <p className='error-message' style={{marginTop: '10px'}}>{submitError}</p>}
                </form>
            </div>
            {isLoading && <LoaderOverlay />}
        </AnimatedPage>
    );
}

const styles = {
    mainButton: {
        marginTop: 20,
        width: '100%',
    } as React.CSSProperties,
    skipButton: {
        marginTop: 20,
        width: 300,
    } as React.CSSProperties,
};
