import React, { useEffect, useState } from 'react';
import logoImage from '../../assets/logo.png';
import trophyImage from '../../assets/winTh.png';
import './Result.css';
import { Button } from "../../features/framer/Button";
import AnimatedPage from "../../features/page/AnimatedPage";
import { useHistory } from "react-router";
import Emitter from "../../features/particle-emitter/Emitter";
import { motion } from 'framer';
import ClipLoader from "react-spinners/ClipLoader";
import { useGetExtraQuizQuery } from "../../app/services/quiz";
import { resetAnswer , resetAdDecider } from '../../slices/quiz/answerSlice'
import { useDispatch, useSelector } from "react-redux";
import { getExtraQuizes, myAnswers, resetAnswersList, selectLevelStatus, selectQuiz } from "../../slices/quiz/quizSlice";
import { useLocalStorage } from "../../app/local-storage";
import tapSfx from "../../assets/sounds/tap.mp3";
import useSound from "../../app/audio/audio";
import { useLocation } from "react-router-dom";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { randomString } from '../../utils/randomString';
import { useUser } from '../../app/hooks';
import { updateUserOffline } from '../../slices/user/userSlice';
function Result() {

    const history = useHistory();
    const location = useLocation();
    const [userLS] = useLocalStorage('trivia-nerds-user', '');
    const currentQuiz = useSelector(selectQuiz)
    const [questionIds, setQuestionIds] = useState(currentQuiz?.questions.map(item => item.id).join(',') || '')
    // const { data: quiz, refetch: refetchQuiz } = useGetExtraQuizQuery(questionIds);
    const levelStatus = useSelector(selectLevelStatus);
    const dispatch = useDispatch();
    const { audio } = useSound(tapSfx);
    const user = useUser();

    let myAnswersList = useSelector(myAnswers);

    // console.log("RESULT myAnswersList :: ", myAnswersList)

    window.localStorage.setItem("stop_init", "true");
    useEffect(() => {
        // refetchQuiz();
        dispatch(resetAnswer());
        dispatch(resetAdDecider())
    }, [location.pathname]);

    const onInteraction = () => {
        // @ts-ignore
        if (['suspended', 'interrupted'].includes(Howler.ctx.state)) {
            // @ts-ignore
            Howler.ctx.resume();
        }
        audio?.play();
        history.push(`/`);
    }

    const pageVariants = {
        in: {
            opacity: 1,
            transition: {
                delay: 0.3,
                type: "tween",
                ease: "easeInOut",
                duration: 0.3,
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        },
    }

    const item = {
        initial: { y: -30, opacity: 0 },
        out: { y: -30, opacity: 0 },
        in: {
            y: 0,
            opacity: 1
        }
    };

    const trophyVariants = {
        initial: {
            scale: 0,
            opacity: 0,
        },
        in: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "tween",
                ease: "backOut",
                duration: 0.3,
                delay: 1,
            }
        },
        out: { y: -30, opacity: 0 },
    }



    const [loadingPostAnswer, setLoadingPostAnswer] = React.useState(false)
    const [_, setUserLS] = useLocalStorage("trivia-nerds-user", "");
    
    React.useEffect(() => {
        (async () => {
            try {
                let token = null
                if (window.location.hostname.indexOf('localhost') > -1) {
                    token = localStorage.getItem('tn-token');
                    if (!token) {
                        token = randomString(32);
                        localStorage.setItem('tn-token', token);
                    }
                    // headers.set('credentials', 'true');//credentials: 'include'
                }
                // alert('sdsds')
                setLoadingPostAnswer(true);
                const request = await fetch(`${process.env.REACT_APP_BASE_URL}api/bulk_answer_question`, {
                    method: 'POST',
                    body: JSON.stringify({ answerList: myAnswersList, tokens: user && user.tokens || 0, points: user && user.points || 0, question_ids: questionIds }),
                    headers: token ? {
                        ...prepareHeaders,
                        'force-identifier': token
                    } :
                        {
                            ...prepareHeaders,
                        }
                })
                const response = await request.json();


                let extraQuizes = {
                    id: response?.current_quiz?.id,
                    title: response?.current_quiz?.title,
                    title_short: response?.current_quiz?.title_short,
                    slug: response?.current_quiz?.slug,
                    description: response?.current_quiz?.description,
                    featured_image: response?.current_quiz?.featured_image,
                    include_at_homepage: response?.current_quiz?.include_at_homepage,
                    include_at_tagpage: response?.current_quiz?.include_at_tagpage,
                    questions: response?.questions?.slice()?.map((item: any) => {
                        const img = new Image();
                        img.src = `${process.env.REACT_APP_BASE_URL}${item.image}`;
                        return {
                            ...item,
                            preloadImg: img
                        }
                    })
                }

                dispatch(getExtraQuizes(extraQuizes))
                dispatch(updateUserOffline(response));
                setUserLS(response.player)
                dispatch(resetAnswersList([]));

                setLoadingPostAnswer(false)
            } catch (error) {
                setLoadingPostAnswer(false)
                console.log("ERROR :: ",error)

            }
        })()
    }, [])

    return (
        <AnimatedPage className='result-page'
        >
            {(!userLS || loadingPostAnswer) ? <ClipLoader color={'#ffffff'} loading={true}
                css={'z-index: 1; display: block; position: absolute; top: 50%; left: 50%; margin: -32px -32px;'}
                size={64} />
                :
                <motion.div className='content'
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}>
                    <motion.img className='logo' src={logoImage} alt='Trivia Nerds Logo' variants={item} />
                    <motion.div className='trophy'
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={trophyVariants}>
                        <img
                            src={trophyImage}
                            alt='Trivia Nerds Trophy' />
                        <div className='level'>{`Level ${(userLS).current_level}`}</div>
                    </motion.div>
                    <motion.div className='label' variants={item}>
                        <p>{(levelStatus === 'completed' || levelStatus === 'playing') ? 'Congratulations!' : 'Better luck next time!'}</p>
                        <p>You are now:</p>
                    </motion.div>
                    <motion.div className='value' variants={item}>{`Level ${(userLS).current_level}`}</motion.div>
                    <motion.div className='value' variants={item}>{`Rank: ${(userLS).rank}`}</motion.div>
                    <motion.div className='label' variants={item}>Reward:</motion.div>
                    <motion.div className='value' variants={item}>{`${(userLS).tokens} Tokens`}</motion.div>
                    <motion.div variants={item}>
                        <Button
                            borderRadius={58}
                            defaultBackground="rgb(26, 255, 37)"
                            defaultTextColor="rgb(20, 71, 0)"
                            font={true}
                            fontSize={37}
                            hoverBackground="rgb(0, 189, 16)"
                            padding={18}
                            pressedBackground="rgb(72, 244, 92)"
                            pressedTextColor="rgb(1, 70, 29)"
                            text={(levelStatus === 'completed' || levelStatus === 'playing') ? 'CONTINUE' : 'TRY AGAIN'}
                            whileHoverScale={1.1}
                            whileTapScale={1.2}
                            style={styles.mainButton}
                            onClick={onInteraction}
                        />
                    </motion.div>
                    {levelStatus === 'completed' && <Emitter />}
                </motion.div>}
        </AnimatedPage>
    );
}

const styles = {
    mainButton: {
        marginTop: 20,
        marginBottom: 60,
        width: 300,
    } as React.CSSProperties,
};

export default Result;
