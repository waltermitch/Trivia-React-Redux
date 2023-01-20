import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSendEmailMutation } from "../../app/services/contact";
import logoImage from "../../assets/logo.png";
import { Button } from "../../features/framer/Button";
import AnimatedPage from "../../features/page/AnimatedPage";
import './Contact.css';

const FORM_ENDPOINT = ""; // TODO - fill on the later step

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [sendEmail, result] = useSendEmailMutation();

    const onSubmit = (data: any) => {
        sendEmail({email: data.email, name: data.name, message: data.message});
        setTimeout(() => {
            setSubmitted(true);
        }, 100);
    };

    /*function onContactClick() {
        window.open('mailto:info@trivianerds.com?subject=Trivia Nerds Contact')
    }*/

    return (
        <AnimatedPage className='contact-page'>
            <Link to="/">
                <img className='logo' src={logoImage} alt='Trivia Nerds Logo'/>
            </Link>
            <h1>Contact Us</h1>
            <div className='content'>
                <div className="contact-details">
                    <div className="label">Phone:</div>
                    <div className="value">(404) 618-0198</div>
                    <div className="label">Address:</div>
                    <div className="value">1372 Peachtree St. NE Atlanta, Ga. 30309</div>
                    <div className="map" />
                    {/*<Button
                        borderRadius={48}
                        defaultBackground="rgb(26, 255, 37)"
                        defaultTextColor="rgb(20, 71, 0)"
                        font={true}
                        fontSize={32}
                        hoverBackground="rgb(0, 189, 16)"
                        padding={10}
                        pressedBackground="rgb(72, 244, 92)"
                        pressedTextColor="rgb(1, 70, 29)"
                        text="CONTACT US"
                        whileHoverScale={0.9}
                        whileTapScale={0.7}
                        style={styles.mainButton}
                        onClick={onContactClick}
                    />*/}
                </div>
               <form
                    className='contact-form'
                    action={FORM_ENDPOINT}
                    onSubmit={handleSubmit(onSubmit)}
                    method="POST"
                    target="_blank"
                >
                    <input
                            type="text"
                            placeholder="Your Name"
                            className={`input ${errors.name? 'error' : ''}`}
                            {...register("name", { required: true })}
                        />
                    {errors.name && <p className='error-message'>Please check Your Name</p>}
                    <input
                            type="email"
                            placeholder="Your Email"
                            className={`input ${errors.email? 'error' : ''}`}
                            {...register("email", {
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                        />
                    {errors.email && <p className='error-message'>Please check Your Email</p>}
                    <textarea
                            placeholder="Your Message"
                            className={`input-message ${errors.message? 'error' : ''}`}
                            {...register("message", { required: true })}
                        />
                    {errors.message && <p className='error-message'>Please check Your Message</p>}
                    <Button
                        type='submit'
                        borderRadius={58}
                        defaultBackground="rgb(26, 255, 37)"
                        defaultTextColor="rgb(20, 71, 0)"
                        font={true}
                        fontSize={37}
                        hoverBackground="rgb(0, 189, 16)"
                        padding={18}
                        pressedBackground="rgb(72, 244, 92)"
                        pressedTextColor="rgb(1, 70, 29)"
                        text="SEND NOW!"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.mainButton}
                    />
                    {!result.isError && (submitted || result.isSuccess) && <div className="submit-message">Thank you! We'll be in touch soon.</div>}
                    {result.isError &&  <div className="submit-message-error">The Message has not been sent. Please try again later.</div>}
                </form>
            </div>
        </AnimatedPage>
    );
};

const styles = {
    mainButton: {
        marginTop: 20,
        marginBottom: 20,
        width: 300,
    } as React.CSSProperties,
};

export default ContactForm;
