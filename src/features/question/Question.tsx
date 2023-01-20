import { AnimatePresence, motion } from 'framer';
import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuestion, useQuiz } from "../../app/hooks";
import {
    aboveHeadlineSlot,
    belowHeadlineSlot
} from "../../data/adSlots";
import { QuizParams } from "../../routes/quiz/Quiz";
import { selectCurrentIndex } from "../../slices/quiz/quizSlice";
import AdContainer from "../ads/AdContainer";
import AnswersContainer from "./AnswersContainer";
import './Question.css';
import QuestionText from "./QuestionText";


export interface QuestionParams {
    onAnswered: Function;
    onSkipped: Function;
    adsData:any
}

const Question = ({ onAnswered, onSkipped,adsData }: QuestionParams) => {
    let { questionId } = useParams<QuizParams>();
    const quiz = useQuiz();
    let currentIndex = useSelector(selectCurrentIndex);


    const question = useQuestion();

    const pageVariants = {
        // initial: {
        //     opacity: 0,
        // },
        // in: {
        //     opacity: 1,
        //     transition: {
        //         type: "tween",
        //         ease: "easeInOut",
        //         duration: 0.3,
        //         delayChildren: 0.1,
        //         staggerChildren: 0.2
        //     }
        // },
        // out: {
        //     opacity: 0,
        // },
    }

    const item = {
        // initial: { x: 60, opacity: 0 },
        // out: { x: -60, opacity: 0 },
        // in: {
        //     x: 0,
        //     opacity: 1
        // }
    };

    const pageTransition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
    };

    // return useMemo(() => {
        // console.log('----------------- ' + JSON.stringify(adsData));
        // console.log('----------------- ' + adsData?.above_buttons.label);
        return (
            <AnimatePresence exitBeforeEnter>
                {quiz && question &&
                    <motion.div key={questionId} className='question' variants={pageVariants} transition={pageTransition}>
                        {(adsData && adsData.above_headline && adsData.above_headline.code !== '') && <AdContainer showLabel={adsData?.above_buttons.label} adsData={adsData && [adsData.above_headline]} slots={aboveHeadlineSlot} style={{ background: adsData?.above_headline.label == 1 ? 'rgba(0, 0, 0, 0.5)' : '', color: 'white' }} />}
                        <QuestionText category={quiz.title_short || quiz.title} text={question.question} variants={item} />
                        {(adsData && adsData.below_headline && adsData.below_headline.code !== '') && <AdContainer showLabel={adsData?.below_headline.label} adsData={adsData && [adsData.below_headline]} slots={belowHeadlineSlot} style={{ background: adsData?.below_headline.label == 1 ? 'rgba(0, 0, 0, 0.5)' : '', color: 'white' }} />}
                        <AnswersContainer answers={question.answers}
                            image={question.image}
                            variants={item}
                            onAnswered={onAnswered}
                            onSkipped={onSkipped}
                            adsData={adsData}
                        />
                    </motion.div>}
            </AnimatePresence>
        )
    // }, [questionId]);
};

export default Question;
