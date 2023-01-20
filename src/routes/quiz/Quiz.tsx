import { LayoutGroup } from "framer";
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import LoaderOverlay from '../../features/page/LoaderOverlay';
import {
    useAnswer,
    useForceAds,
    useLevel,
    useQuestion,
    useQuiz, useRank, useSlots, useUser
} from "../../app/hooks";
import { useLocalStorage } from "../../app/local-storage";
import { useGetAdsConfigQuery } from "../../app/services/ads";
import { useGetQuizQuery } from "../../app/services/quiz";
import { useGetLvlDataQuery, useGetRankQuery, useGetUserQuery } from "../../app/services/user";
import {
    belowQuestionSlot, pageLevel1,
    pageLevel2,
    pageLevel3, removeGTM,
    removeProperStickyAd,
    renderProperStickyAd,
    rightSlot
} from "../../data/adSlots";
import AdContainer from "../../features/ads/AdContainer";
import { Button } from "../../features/framer/Button";
import { generateDefultSlotsList } from "../../features/framer/utils/propUtils";
import AnimatedPage from "../../features/page/AnimatedPage";
import QuizHeader from "../../features/page/QuizHeader";
import PreviousQuestionResult from "../../features/previous-result/PreviousQuestionResult";
import Question from "../../features/question/Question";
import { toggleForceAds } from "../../slices/adsSlice";
import { createDefaultSlots, skipAnswer, updateAnswer } from "../../slices/quiz/answerSlice";
import {
    addAnswer, myAnswers, selectAnsweredAll,
    selectCurrentIndex,
    skipCurrentQuestion
} from "../../slices/quiz/quizSlice";
import { updateUserOffline } from "../../slices/user/userSlice";
// import Goal from "./Goal";
import "./Quiz.css";

const check_level_completed = (level: number, userObjOld: any, levelsList: any, ranksList: any) => {
    // @ts-ignore'




    const index = level// + 1

    // 

    const userObj = { ...userObjOld }


    let level_requirements = levelsList[userObjOld.current_level];






    if (userObj['current_level_total_answered'] >= level_requirements['correct']) {
        let latest_votes = userObj.current_level_latest_votes;
        if (latest_votes['correct'] >= level_requirements['correct']) {
            userObj['bonus_tokens'] = userObj['current_level'] * 100 + Math.round(Math.random() * 100)
            userObj['tokens'] = (userObj['current_level'] * 100) + Math.round(Math.random() * 100) + userObj.bonus_tokens;
            userObj['current_level']++;
            userObj['current_level_total_answered'] = 0;
            userObj['current_level_correct_answers'] = 0;
            userObj['rank'] = ranksList[userObj['current_level']]
            return { status: 'completed', data: userObj };
        } else if (userObj['current_level_total_answered'] >= level_requirements['num']) {
            userObj['bonus_tokens'] = 50;
            userObj['tokens'] += userObj.bonus_tokens;
            userObj['current_level_total_answered'] = 0;
            userObj['current_level_correct_answers'] = 0;
            return { status: 'failed', data: userObj };
        }
    }
    return { status: 'playing', data: userObj };
}


const skip_question = (level: number, userObjOld: any, answer: any, levelsList: any, ranksList: any) => {
    const userObj = { ...userObjOld }
    if (userObj['tokens'] >= 500) {
        userObj['tokens'] -= 500;
        userObj['streak'] = 0;
        userObj['current_level_correct_answers']++;
        userObj['current_level_total_answered']++;
        userObj['current_quiz_total_answered']++;

        // $answeredQuestions = get_answered_questions_cached($this -> playerVotesModel, userObj['id'], userObj['current_quiz']);
        // $questions = get_questions_cached($this -> questionModel, userObj['current_quiz']);
        // $questions = remove_answered_questions($questions, $answeredQuestions);
        // $answer = $this -> answerModel -> getCorrectAnswer($questions[0]['id']);

        // $this -> playerVotesModel -> saveVote($this -> player['id'], userObj['current_quiz'], $questions[0]['id'], 1);

        // $this->check_quiz_completed($questions);

        let level_status = check_level_completed(level, userObj, levelsList, ranksList).status;

        // $this->playerModel->updatePlayerVoteData($this->player);

        return {
            'success': true,
            'level_status': level_status,
            'player': userObj,
            'answer': answer
        }
        //        json(['success'=>true, 'level_status'=>level_status, 'player'=>$this->public_player_data(), 'answer'=>$answer]);
    } else {
        return {
            'success': false,
            //  'level_status': level_status,
            'player': userObj,
            ///   'answer': $answer,
            'error': 'Not enough tokens to skip this question. ' + 500 + ' needed.'
        }
        // json(['success'=> false, 'error'=> 'Not enough tokens to skip this question. '.TOKENS_TO_SKIP. ' needed.', 'player'=> $this -> public_player_data()]);
    }
}


export interface QuizParams {
    quizId: string;
    questionId: string;

}
export interface QuizParam {
    adsData?: any;

}

function Quiz({ adsData }: QuizParam) {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
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




    const { isLoading: isUserLoading, refetch: refetchUser } = useGetUserQuery(serializeParams);

    // React.useEffect(()=>{
    //     refetchUser()
    // },[])
   
    const { data: quizData, isLoading: isQuizLoading, refetch: refetchQuiz } = useGetQuizQuery();

    const quiz = useQuiz();
    const levelsList = useLevel();
    const ranksList = useRank();


    React.useEffect(() => {

        // if (levelsList.length <= 0) {
        //     refetchLevelData()
        // } else if (ranksList.length <= 0) {
        //     refetchRankData()
        // }
        if (quiz === undefined) {
            refetchUser();
            refetchQuiz()
        }
    }, [])

    // 
    const forceAdsState = useForceAds();
    const previousAnswer = useAnswer();
    let { quizId, questionId } = useParams<QuizParams>();
    // const [answerQuestion, { isLoading: isAnswering }] =
    //     useAnswerQuestionMutation();
    // const [skipQuestion] = useSkipQuestionMutation();
    const currentQuestion = useQuestion();
    const [_, setUserLS] = useLocalStorage("trivia-nerds-user", "");
    // const { data: adsData } = useGetAdsConfigQuery();



    const query = new URLSearchParams(window.location.search);
    const forceAds = query.get("forceAds");

    let answeredAll = useSelector(selectAnsweredAll);
    let myAnswersList = useSelector(myAnswers);


    let currentIndex = useSelector(selectCurrentIndex);
    const state = history.location.state as { from: string };

    const animateIn = !(state && state.from === "quiz");

    const pushedSlots = useSlots();

    console.log(pushedSlots)

    if (forceAds) {
        dispatch(toggleForceAds(true));
    }


    // React.useEffect(() => {

    //     let adsKeys = Object.keys(adsData);
    //     if (adsKeys.length > 0) {
    //         const slotsList = generateDefultSlotsList(adsKeys, pushedSlots)
    //         dispatch(createDefaultSlots(slotsList))
    //     }
    // }, [])


    useEffect(() => {
        window.localStorage.removeItem('isLastQuiz')
        if (user && previousAnswer && previousAnswer.level_status !== "playing") {
            window.localStorage.setItem('isLastQuiz' , 'true');
            window.localStorage.setItem('isCompleted' , 'true');
            setUserLS(user);
            removeProperStickyAd();
            history.push(`/result`);
        } else if (currentIndex > 0) {
            nextQuestion();
            window.localStorage.removeItem('isCompleted');
        }
    }, [currentIndex]);

    useEffect(() => {
        if (user && !user.email) {
            let hasShown = localStorage.getItem("tn-email-shown");
            // 
            if (
                user.current_level > 0 &&
                user.current_level % 3 === 0 &&
                hasShown !== "true"
            ) {
                localStorage.setItem("tn-email-shown", "true");
                history.push(`/email`, { from: "quiz", background: location });
            } else if (user.current_level % 3 !== 0) {
                localStorage.setItem("tn-email-shown", "false");
            }
        }

        renderProperStickyAd(
            user
                ? (!user.subscription_ends &&
                    user.current_level >=
                    (adsData ? adsData.page_level_1.min_level : 2)) ||
                forceAdsState
                : forceAdsState,
            adsData && adsData.page_level_1
        );
        // @ts-ignore
    }, [location.pathname]);

    useLayoutEffect(
        () => () => {
            removeGTM();
        },
        []
    );



    // console.log(
    //     "quizId",
    //     quizId,
    //     "questionId",
    //     questionId,
    //     isQuizLoading,
    //     isUserLoading,
    //     isAnswering
    // );



    function onContinueInteraction() {
        refetchQuiz();
        nextQuestion();
    }

    const onAnswered = (id: number) => {
        if (quiz && currentQuestion) {
            let correctAnswers = currentQuestion.answers.filter(
                (answer) => answer.is_correct == 1
            );
            let correctAnswer = correctAnswers[0];

            if (correctAnswers[0].id == id) {
            }
            let currentLevel = user?.current_level || -1

            let is_answer_correct = correctAnswers[0].id == id ? true : false
            let user_points = user?.points || 0
            let user_token = user && is_answer_correct ? user.tokens + 5 : user?.tokens || 0
            let user_streaks = is_answer_correct ? (user?.streak || 0) + 1 : 0
            let current_quiz_total_answered = user ? user?.current_quiz_total_answered + 1 : 0
            let current_level_total_answered = user ? user?.current_level_total_answered + 1 : 0
            let current_level_correct_answers = user ? is_answer_correct ? user?.current_level_correct_answers + 1 : user?.current_level_correct_answers : 0
            let isCorrectVote = user ? is_answer_correct ? user?.current_level_latest_votes.correct + 1 : user?.current_level_latest_votes.correct : 0;
            let isIncorrectVote = user ?
                !is_answer_correct ?
                    user?.current_level_latest_votes.incorrect + 1
                    :
                    user?.current_level_latest_votes.incorrect
                :
                0;
            let answerVotesList = user && user.current_level_latest_votes && user.current_level_latest_votes.latest && [is_answer_correct ? 1 : 0, ...user.current_level_latest_votes.latest] || [is_answer_correct ? 1 : 0]




            let current_level_latest_votes = {
                "latest": answerVotesList,
                "incorrect": isIncorrectVote,
                "correct": isCorrectVote,
                "total": user && user?.current_level_latest_votes.total + 1 || 1
            }
            const cloneUser = { ...user, current_level_latest_votes, current_quiz_total_answered, current_level_total_answered, current_level_correct_answers, user_streaks, tokens: user_token };
            let checkLvlStatus = check_level_completed(currentLevel, cloneUser, levelsList, ranksList)

            let quizResultResponse = {

                "success": true,
                "errors": false,
                "is_correct": is_answer_correct,
                "correct_answer": correctAnswers[0],
                "level_status": checkLvlStatus.status,
                "player": {
                    ...user,
                    "id": user?.id,
                    "registered": user?.registered,
                    "points": is_answer_correct ? (user_points * 1) + 100 : user?.points,
                    "tokens": checkLvlStatus.data.tokens,
                    "streak": is_answer_correct ? user_streaks : 0,
                    "current_quiz": user?.current_quiz,
                    "current_quiz_total_answered": current_quiz_total_answered,
                    "current_level": checkLvlStatus.data.current_level,// How 
                    "bonus_tokens": checkLvlStatus.data.bonus_tokens,
                    "current_level_total_answered": current_level_total_answered,
                    "current_level_correct_answers": current_level_correct_answers,
                    "rank": checkLvlStatus.data.current_level ? ranksList[checkLvlStatus.data.current_level].rank : ranksList[0].rank,
                    "registered_with_password": user?.registered_with_password,
                    "logged_with_password": user?.logged_with_password,
                    "next_level_requirements": user?.next_level_requirements,
                    "current_level_latest_votes": current_level_latest_votes

                }
            }


            // setUserLS(quizResultResponse.player);
            // 

            // console.log(quizResultResponse.player)

            dispatch(
                addAnswer({
                    question_id: currentQuestion.id,
                    answer_id: id,
                    level_status: quizResultResponse.level_status
                })
            );
            // @ts-ignore
            dispatch(updateAnswer({ ...quizResultResponse.correct_answer, explain_answer: currentQuestion && currentQuestion.explain_answer || '', is_correct: quizResultResponse.is_correct ? 1 : 0, level_status: quizResultResponse.level_status }));

            dispatch(updateUserOffline(quizResultResponse));
            // answerQuestion({
            //     question_id: currentQuestion.id,
            //     answer_id: id,
            // });
            // history.push(`/quiz/${quizId}/${questionId}`, { from: 'quiz' });
            // skipQuestion({
            //     question_id: id
            // });
        }
    };

    const onSkipped = () => {
        if (currentQuestion) {
            try {
                let correctAnswers = currentQuestion.answers.filter(
                    (answer) => answer.is_correct == 1
                );
                dispatch(
                    addAnswer({
                        question_id: currentQuestion.id,
                        answer_id: null
                    })
                );
                const status = skip_question(user && user.current_level || 0, user, correctAnswers[0], levelsList, ranksList)

                // 
                dispatch(updateUserOffline(status));
                dispatch(skipCurrentQuestion(status.level_status))
                if (status.level_status !== undefined) {
                    dispatch(skipAnswer({
                        answer: {
                            ...correctAnswers[0],
                            level_status: status.level_status, //skip_question(user && user.current_level || 0, user, correctAnswers[0]).level_status ,
                            is_correct: 1
                        }
                    }))
                } else {
                    removeProperStickyAd();
                    history.push(`/result`);
                }
                setUserLS(status.player);
            } catch (error: any) {
                alert(error.message);
            }
            // skipQuestion({ question_id: currentQuestion.id });
        } else {
            alert('else part')
        }
    };

    const nextQuestion = () => {
        if (quiz && currentQuestion) {
            quizId = quiz.id.toString();
            const questionId = currentQuestion.id.toString();
            if (true == true) {
                history.push(`/quiz/${quizId}/${questionId}`, { from: "quiz" });
            }
        }
    };
    
    return useMemo(() => {
        return (
            <AnimatedPage
                className="quiz-page"
                animateIn={animateIn}
                animateOut={false}
            >
                {(!quiz || isQuizLoading || !user || isUserLoading) ? (
                    <LoaderOverlay loadingText={true} />
                ) : (
                    <>
                        <QuizHeader />
                        <div className="content" key={"content-" + questionId}>
                            <div className="container">
                                <LayoutGroup>
                                    <PreviousQuestionResult adsData={adsData} questionId={questionId} quiz={quizData} />
                                    {answeredAll ? (
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
                                            text="CONTINUE"
                                            whileHoverScale={1.1}
                                            whileTapScale={1.2}
                                            style={styles.mainButton}
                                            onClick={onContinueInteraction}
                                        />
                                    ) : (
                                        <Question onAnswered={onAnswered} onSkipped={onSkipped} adsData={adsData} />
                                    )}
                                    {adsData &&
                                        adsData.below_question &&
                                        adsData.below_question.code !== "" && (
                                            <AdContainer
                                                showLabel={adsData?.below_question.label}
                                                adsData={adsData && [adsData.below_question]}
                                                slots={belowQuestionSlot}
                                            />
                                        )}
                                    {adsData &&
                                        adsData.page_level_1 &&
                                        adsData.page_level_1.code !== "" && (
                                            <AdContainer
                                                showLabel={adsData?.page_level_1.label}
                                                adsData={adsData && [adsData.page_level_1]}
                                                slots={pageLevel1}
                                            />
                                        )}
                                    {adsData &&
                                        adsData.page_level_2 &&
                                        adsData.page_level_2.code !== "" && (
                                            <AdContainer
                                                showLabel={adsData?.page_level_2.label}
                                                adsData={adsData && [adsData.page_level_2]}
                                                slots={pageLevel2}
                                            />
                                        )}
                                    {adsData &&
                                        adsData.page_level_3 &&
                                        adsData.page_level_3.code !== "" && (
                                            <AdContainer
                                                showLabel={adsData?.page_level_3.label}
                                                adsData={adsData && [adsData.page_level_3]}
                                                slots={pageLevel3}
                                            />
                                        )}
                                </LayoutGroup>
                            </div>
                            <div className="position-sticky">
                                <AdContainer
                                    showLabel={1}
                                    adsData={
                                        adsData && [
                                            adsData.right_rail_upper,
                                            adsData.right_rail_middle,
                                            adsData.right_rail_bottom,
                                        ]
                                    }
                                    slots={rightSlot}
                                    style={{ marginLeft: "15px" }}
                                />
                            </div>
                        </div>
                        {/* <LoaderOverlay /> */}
                        {/* {isAnswering && <LoaderOverlay />} */}
                    </>
                )}
                {/* <Goal /> */}
            </AnimatedPage>
        );
    }, [questionId, isQuizLoading, isUserLoading]);//isAnswering
}

const styles = {
    mainButton: {
        marginTop: 20,
        marginBottom: 60,
        width: 300,
    } as React.CSSProperties,
};

export default Quiz;
