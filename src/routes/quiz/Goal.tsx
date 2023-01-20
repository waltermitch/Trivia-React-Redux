import { AnimatePresence, motion } from 'framer';
import React, { useEffect, useState } from 'react';
import './Goal.css';
import goalRibbon from "../../assets/goal_2_2x.png";
import trophyImage from "../../assets/rankTrophy_2x.png";
import { Button } from '../../features/framer/Button';
import { useAnswer, useNextLevel } from "../../app/hooks";
import { useGetNextLevelsQuery } from "../../app/services/levels";
import useSound from "../../app/audio/audio";
import whooshSfx from "../../assets/sounds/whoosh.mp3";
import tapSfx from "../../assets/sounds/tap.mp3";
import { useQuiz } from './../../app/hooks';

const Goal = () => {
    // const [goalVisible, setGoalVisible] = useState(true);
    const [goalVisible, setGoalVisible] = useState(false);
    const previousAnswer = useAnswer();
    const { refetch: refetchNextLevels } = useGetNextLevelsQuery();
    const { audio: whooshAudio } = useSound(whooshSfx);
    const { audio: tapAudio } = useSound(tapSfx);
    //const [play] = useSound(whooshSfx, { volume: 1 });

    const levels = useNextLevel()


    React.useEffect(() => {
        if (levels.length <= 0) {
            refetchNextLevels();
        }
    }, [])

    useEffect(() => {

        setTimeout(() => {
            setGoalVisible(false);
        }, 3000);
        if (!previousAnswer) {
            // @ts-ignore
            if (['suspended', 'interrupted'].includes(Howler.ctx.state)) {
                // @ts-ignore
                Howler.ctx.resume();
            }
            whooshAudio?.play();
        }
    }, [previousAnswer]);

    const overlayVariants = {
        initial: {
            opacity: 0,
        },
        in: {
            opacity: 1,
        },
        out: {
            opacity: 0,
        }
    }

    const goalVariants = {
        initial: {
            y: -1000,
        },
        in: {
            y: 0,
        },
        out: {
            opacity: -1000,
        }
    }

    const transition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.3,
        delayChildren: 0.3
    };

    function onInteraction() {
        // @ts-ignore
        if (['suspended', 'interrupted'].includes(Howler.ctx.state)) {
            // @ts-ignore
            Howler.ctx.resume();
        }
        tapAudio?.play();
        setGoalVisible(false);
    }

    return (
        <AnimatePresence exitBeforeEnter>
            {goalVisible && !previousAnswer && <motion.div className='overlay'
                initial="initial"
                animate="in"
                exit="out"
                variants={overlayVariants}
                transition={transition}
                onClick={onInteraction}>
                <motion.div className='goal'
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={goalVariants}
                    transition={transition}>
                    <img className='ribbon' src={goalRibbon} alt='Trivia Nerds Ribbon' />
                    <img className='trophy' src={trophyImage} alt='Trivia Nerds Trophy' />
                    {levels && levels.length && <div className='message'>{levels[0].title}</div>}
                    <Button
                        style={styles.mainButton}
                        borderRadius={28}
                        defaultBackground="rgb(30, 255, 36)"
                        defaultTextColor="rgb(20, 71, 1)"
                        fontSize={34}
                        hoverBackground="rgb(53, 189, 15)"
                        onClick={onInteraction}
                        padding={11}
                        pressedBackground="rgb(72, 244, 92)"
                        pressedTextColor="rgb(13, 69, 29)"
                        text="Continue"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                    />
                </motion.div>
            </motion.div>}
        </ AnimatePresence>
    );
}

const styles = {
    mainButton: {
        zIndex: 3,
        marginTop: 20,
        marginBottom: 30,
        width: 300,
    } as React.CSSProperties,
};

export default Goal;
