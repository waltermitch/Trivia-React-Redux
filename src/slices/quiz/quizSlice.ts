import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import QuestionModel from "../../app/models/QuestionModel";
import { quizApi } from "../../app/services/quiz";
import { QuizModel } from "../../app/models/QuizModel";
import { answerApi } from "../../app/services/answer";
import { userApi } from "../../app/services/user";
import { stat } from 'fs';

export interface QuizState {
    currentIndex: number;
    currentQuiz: QuizModel | undefined;
    currentQuestion: QuestionModel | undefined;
    previousCorrect: boolean;
    answeredAll: boolean;
    level_status: string;
    answers: any;
}

const initialState: QuizState = {
    currentIndex: 0,
    currentQuiz: undefined,
    currentQuestion: undefined,
    previousCorrect: true,
    answeredAll: false,
    level_status: 'playing',
    answers: []
};


export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {


        getExtraQuizes: (state, action: PayloadAction<any>) => {
            const { payload } = action
            
            if (state.currentQuiz && state.currentQuiz.id == payload.id) {
                const newQuestions = [
                    ...state.currentQuiz.questions,
                    ...payload.questions.filter((item:any) => !state.currentQuiz?.questions.find(el => el.id == item.id))
                ]
                state.currentQuiz.questions = newQuestions
                state.currentQuestion = newQuestions[state.currentIndex];
            }
        },

        skipCurrentQuestion: (state, action: PayloadAction<any>) => {
            state.currentIndex += 1;
            if (state.currentQuiz) {
                if (state.currentIndex < state.currentQuiz.questions.length) {
                    state.answeredAll = false;
                    state.level_status = action.payload.level_status;
                    state.currentQuestion = state.currentQuiz.questions[state.currentIndex];
                } else {
                    state.answeredAll = true;
                    state.currentQuestion = undefined;
                }
            }
        },
        resetAnswersList: (state, action: PayloadAction<any>) => {
            state.answers = action.payload
        },
        addAnswer: (state, action: PayloadAction<any>) => {
            // state.answers.push(action.payload);
            state.answers = [...state.answers, action.payload]
            if (action.payload.answer_id) {
                state.currentIndex = state.currentIndex + 1;
                if (state.currentQuiz) {
                    if (state.currentIndex < state.currentQuiz.questions.length) {
                        state.answeredAll = false;
                        state.level_status = action.payload.level_status;
                        state.currentQuestion = state.currentQuiz.questions[state.currentIndex];
                    } else {
                        state.answeredAll = true;
                        state.currentQuestion = undefined;
                    }
                }
            }
        },
        resetQuizSlice: () => {
            return initialState
        },

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            quizApi.endpoints.getExtraQuiz.matchFulfilled,
            (state, { payload }) => {
                // console.log(payload)
                if (state.currentQuiz && state.currentQuiz.id == payload.id) {
                    const newQuestions = [
                        ...state.currentQuiz.questions,
                        ...payload.questions.filter(item => !state.currentQuiz?.questions.find(el => el.id == item.id))
                    ]
                    state.currentQuiz.questions = newQuestions
                    state.currentQuestion = newQuestions[state.currentIndex];
                }
            }
        )
        builder.addMatcher(
            quizApi.endpoints.getQuiz.matchFulfilled,
            (state, { payload }) => {
                state.currentIndex = 0;
                state.answeredAll = false;
                state.currentQuiz = payload
                state.currentQuestion = payload.questions[state.currentIndex];
            }
        )
        builder.addMatcher(
            answerApi.endpoints.answerQuestion.matchFulfilled,
            (state, { payload }) => {
                state.currentIndex += 1;
                if (state.currentQuiz) {
                    if (state.currentIndex < state.currentQuiz.questions.length) {
                        state.answeredAll = false;
                        state.level_status = payload.level_status;
                        state.currentQuestion = state.currentQuiz.questions[state.currentIndex];
                    } else {
                        state.answeredAll = true;
                        state.currentQuestion = undefined;
                    }
                }
            }
        )
        builder.addMatcher(
            answerApi.endpoints.skipQuestion.matchFulfilled,
            (state, { payload }) => {
                state.currentIndex += 1;
                if (state.currentQuiz) {
                    if (state.currentIndex < state.currentQuiz.questions.length) {
                        state.answeredAll = false;
                        state.level_status = payload.level_status;
                        state.currentQuestion = state.currentQuiz.questions[state.currentIndex];
                    } else {
                        state.answeredAll = true;
                        state.currentQuestion = undefined;
                    }
                }
            }
        )
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectQuestion = (state: RootState) => state.quiz.currentQuestion;
export const selectQuiz = (state: RootState) => state.quiz.currentQuiz;
export const selectAnsweredAll = (state: RootState) => state.quiz.answeredAll;
export const myAnswers = (state: RootState) => state.quiz.answers;
export const selectCurrentIndex = (state: RootState) => state.quiz.currentIndex;
export const selectLevelStatus = (state: RootState) => state.quiz.level_status;
export const { addAnswer, resetAnswersList, skipCurrentQuestion,getExtraQuizes, resetQuizSlice } = quizSlice.actions;
export default quizSlice.reducer;
