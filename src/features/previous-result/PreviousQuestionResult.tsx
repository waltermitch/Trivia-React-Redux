import { AnimatePresence, motion } from 'framer';
import React, { useMemo , useEffect , useState } from 'react';
import { useSelector } from "react-redux";
import { useAnswer, useUser } from "../../app/hooks";
import correctIcon from "../../assets/correct.png";
import downArrow from "../../assets/down-arrow.png";
import trophyRank from "../../assets/trophyRank2.png";
import trophyScore from "../../assets/trophyScore.png";
import wrongIcon from "../../assets/x.png";
import { aboveCorrectAnswerSlot, aboveScoreSlot, belowCorrectAnswerSlot } from "../../data/adSlots";
import { selectCurrentIndex } from "../../slices/quiz/quizSlice";
import AdContainer from "../ads/AdContainer";
import CorrectAnswerContainer from "./CorrectAnswerContainer";
import './PreviousQuestionResut.css';
interface PreviousQuestionResultParams {
    adsData?: any;
    questionId: string;
    quiz:any;
}

const PreviousQuestionResult = ({ adsData , questionId,quiz }: PreviousQuestionResultParams) => {
  
    const previousAnswer = useAnswer();
    const user = useUser();

    let currentIndex = useSelector(selectCurrentIndex);
    let image = '';

    const shouldAnimateIn = currentIndex <= 1;
    const score = user ? user.points : 0;

    if (previousAnswer && previousAnswer.explain_image) {
        image = previousAnswer.explain_image;
    } else if (quiz && currentIndex > 0) {
        image = quiz.questions[currentIndex - 1].image
    }

    // var storedTime: any;
    // storedTime = localStorage.getItem("pageview_timer");
    // if(storedTime) {
    //     storedTime = new Date(JSON.parse(storedTime));
    //     alert(storedTime)
    //     var currentTime: any = new Date();
        
    //     let timeDiffInSeconds = (currentTime.getTime() - storedTime.getTime()) / 1000;
        
    // }
    
    const pageVariants = {
        // initial: {
        //     opacity: 1,
        //     height: shouldAnimateIn ? 0 : 'auto',
        // },
        // in: {
        //     opacity: 1,
        //     height: 'auto',
        // },
        // out: {
        //     opacity: 0,
        // }
    }

    const item = {
        // initial: {
        //     x: 60,
        //     opacity: 0
        // },
        // out: {
        //     x: -60,
        //     opacity: 0,
        // },
        // in: {
        //     x: 0,
        //     opacity: 1,
        // }
    };

    const transition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.2,
        staggerChildren: 0.1
    }

    const gotoQuestion = () => {
        const section = document.querySelector('.question');
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    return useMemo(() => {
    return (
        <AnimatePresence>
            {previousAnswer && user &&
                <motion.div key={questionId} initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                    className={`previous-question-result ${previousAnswer.is_correct ? 'correct' : 'wrong'}`}>
                    {(adsData && adsData.above_score && adsData.above_score.code !== '') && <AdContainer showLabel={adsData?.above_score.label} adsData={adsData && [adsData.above_score]} slots={aboveScoreSlot} style={{ background: adsData?.above_score.label == 1 ? 'rgba(0, 0, 0, 0.5)' : '', color: 'white', marginTop: '40px' }} />}
                    <motion.div  key={previousAnswer.explain_answer + 'header'} className='result-header'
                        variants={item}>
                        <div className='score'>
                            <img src={trophyScore} alt='Score Trophy' />
                            <span style={{ marginTop: 5 }}>Score: {score}</span>
                        </div>
                        <img className={`${previousAnswer.is_correct ? 'correct' : 'wrong'}-icon`}
                            src={previousAnswer.is_correct ? correctIcon : wrongIcon}
                            alt={`${previousAnswer.is_correct ? 'Correct' : 'Wrong'} Icon`} />
                        <div className='rank'>
                            <img src={trophyRank} alt='Rank Trophy' />
                            <span style={{ marginTop: 5 }}>Rank: {user.rank}</span>
                        </div>
                    </motion.div>
                    <motion.div key={previousAnswer.explain_answer + 'ribbon-top'}
                        className={`ribbon-top ${previousAnswer.is_correct ? 'correct' : 'wrong'}`}
                        variants={item}>
                        <span>{previousAnswer.is_correct ? 'Nailed It!' : 'Not Quite!'}</span>
                    </motion.div>
                    {(adsData && adsData.above_correct_answer && adsData.above_correct_answer.code !== '') && <AdContainer showLabel={adsData?.above_correct_answer.label} adsData={adsData && [adsData.above_correct_answer]} slots={aboveCorrectAnswerSlot} style={{ background: adsData?.above_correct_answer.label == 1 ? 'rgba(0, 0, 0, 0.5)' : '', color: 'white' }} />}
                    <motion.div key={previousAnswer.explain_answer + 'answer'}
                        className='correct-answer'
                        variants={item}>
                        {`Correct Answer: ${previousAnswer.answer}`}
                    </motion.div>
                    <motion.div key={previousAnswer.explain_answer + 'image'} variants={item}>
                        <CorrectAnswerContainer text={previousAnswer.explain_answer} image={image} />
                    </motion.div>
                    {(adsData && adsData.below_answer_explain && adsData.below_answer_explain.code !== '') && <AdContainer showLabel={adsData?.below_answer_explain.label} adsData={adsData && [adsData.below_answer_explain]} slots={belowCorrectAnswerSlot} style={{ background: adsData?.below_answer_explain.label == 1 ? 'rgba(0, 0, 0, 0.5)' : '', color: 'white' }} />}
                    <motion.div key={previousAnswer.explain_answer + 'ribbon-bottom'}
                        className={`ribbon-bottom ${previousAnswer.is_correct ? 'correct' : 'wrong'}`}
                        variants={item}>
                        <span onClick={gotoQuestion} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                            <img src={downArrow} alt='Down Arrow' />
                            {previousAnswer.is_correct ? 'Keep Going!' : 'Try Another!'}
                            <img src={downArrow} alt='Down Arrow' />
                        </span>;
                    </motion.div>
                </motion.div>}
        </AnimatePresence>
    )
    }, [questionId]);
};

export default PreviousQuestionResult;
