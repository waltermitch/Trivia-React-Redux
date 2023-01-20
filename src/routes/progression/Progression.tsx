import React, { useEffect } from 'react';
import logoImage from '../../assets/logo.png';
import trophyImage from '../../assets/trophyBig.png';
import star from '../../assets/star.png';
import './Progression.css';
import { Button } from "../../features/framer/Button";
import LevelItem from "../../features/progression/LevelItem";
import AnimatedPage from "../../features/page/AnimatedPage";
import { useHistory } from 'react-router';
import { motion } from 'framer';
import { useGetUserQuery, useGetLvlDataQuery, useGetRankQuery } from "../../app/services/user";
import ClipLoader from "react-spinners/ClipLoader";
import { useGetPreviousLevelsQuery } from "../../app/services/levels";
import LevelModel from "../../app/models/LevelModel";
import { useGetQuizQuery } from "../../app/services/quiz";
import useSound from "../../app/audio/audio";
import tapSfx from "../../assets/sounds/tap.mp3";
import { Howler } from "howler";
import { useLocation } from "react-router-dom";
import { useLevel, usePreviousLevel, useQuiz, useRank, useUser } from '../../app/hooks';
import { useLocalStorage } from '../../app/local-storage';

function Progression(props: any) {
    const location = useLocation();
    const currQuiz = useQuiz()

    const user = useUser();
    const isSearchParams = location?.search

    const queryParam = isSearchParams ? location.search.substring(1) : '';
    const serializeParams = (user?.utm_campaign && user.utm_source) ? {
        utm_campaign: user?.utm_campaign,
        utm_source: user.utm_source
    } : (user?.utm_campaign) ? {
        utm_campaign: user?.utm_campaign,
    } : (user?.utm_source) ? {
        utm_source: user?.utm_source,
    } : isSearchParams ? Object.fromEntries(new URLSearchParams(queryParam)) :
        {}



    //    const { isLoading:lvlLoading  } = useGetLvlDataQuery();
    const [_, setUserLS] = useLocalStorage("trivia-nerds-user", "");

    const {  isLoading, refetch: refetchUser } = useGetUserQuery(serializeParams);
    const { refetch: refetchPreviousLevels } = useGetPreviousLevelsQuery();
    const { isLoading: isLvlLoading, refetch: refetchLevelData } = useGetLvlDataQuery();
    const { isLoading: isRankLoading, refetch: refetchRankData } = useGetRankQuery();
    const { data: quiz, isLoading: loading, refetch: refetchQuestions } = useGetQuizQuery();

    const levelsList = useLevel();
    const ranksList = useRank();
    const { audio } = useSound(tapSfx);
    const history = useHistory();
    const levels = usePreviousLevel()

    // console.log("CURRENT_QUIZ : ", currQuiz)

    useEffect(() => {
        if (levelsList.length <= 0) {
            refetchLevelData()
        } else if (ranksList.length <= 0) {
            refetchRankData()
        }
        if (currQuiz === undefined) {
            refetchUser();
            refetchQuestions();
        }
        if (levels.length <= 0) {
            refetchPreviousLevels();
        }

        // 
    }, [location.pathname]);


    // React.useEffect(() => {
    //     if (data!==undefined) {
    //         setUserLS(data)
    //     }
    // }, [data])

    const onInteraction = () => {
        //@ts-ignore
        // alert(`/quiz/${quiz.id}/${quiz.questions[0].id}`)
        // @ts-ignore
        if (['suspended', 'interrupted'].includes(Howler.ctx.state)) {
            // @ts-ignore
            Howler.ctx.resume();
        }
        audio?.play();
        if (quiz) {
            history.push(`/quiz/${quiz.id}/${quiz.questions[0].id}`);
        }
    }

    const pageVariants = {
        in: {
            opacity: 1,
            transition: {
                delay: 0.3,
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


    return (
        <AnimatedPage className='progression-page'>
            {(!user || isLoading || loading) ? <ClipLoader color={'#ffffff'} loading={true} css={'z-index: 1; display: block; position: absolute; top: 50%; left: 50%; margin: -32px -32px;'} size={64} />
                :
                <motion.div className='content'
                    animate="in"
                    variants={pageVariants}>
                    <motion.img className='logo' src={logoImage} alt='Trivia Nerds Logo' variants={item} />
                    <motion.img className='trophy' src={trophyImage} alt='Trivia Nerds Trophy' variants={item} />
                    <motion.div className='rank' variants={item}>Rank: {user.rank}</motion.div>
                    <motion.div className='tokens-container' variants={item}>
                        <div className='tokens'>Current Tokens: {user.tokens}</div>
                        <img className='star' src={star} alt='Token Star' />
                    </motion.div>
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
                            text="PLAY"
                            whileHoverScale={1.1}
                            whileTapScale={1.2}
                            style={styles.mainButton}
                            onClick={onInteraction}
                        />
                    </motion.div>{/*
                <motion.div variants={item}>
                    <Button
                        borderRadius={28}
                        defaultBackground="rgb(200, 20, 255)"
                        hoverBackground="rgb(189, 0, 189)"
                        padding={18}
                        pressedBackground="rgb(244, 72, 239)"
                        text="Use 1000 token skip 2 questions"
                        whileHoverScale={0.9}
                        whileTapScale={0.7}
                        style={styles.mainButton}
                    />
                </motion.div>*/}
                    {levels && <motion.div className='levels-list' variants={item}>
                        {// @ts-ignore
                            levels.filter((level, index) => index < 3).map((level: LevelModel) => {
                                return <LevelItem key={level.level} level={level.level} text={level.title} />
                            })
                        }
                    </motion.div>}
                </motion.div>}
        </AnimatedPage>
    );
}

const styles = {
    mainButton: {
        marginTop: 20,
        width: 300,
    } as React.CSSProperties,
};

export default Progression;
