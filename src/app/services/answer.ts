import AnswerModel from "../models/AnswerModel";
import UserModel from "../models/UserModel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { randomString } from "../../utils/randomString";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { UserResponse } from "./user";

export interface AnswerPost {
    question_id: number;
    answer_id: number;
}

export interface BulkAnsweringQuestions {
    payload: any;
}
export interface SkipPost {
    question_id: number;
}

export interface AnswerResponse {
    success: boolean;
    errors: boolean;
    answer: AnswerModel;
    correct_answer: AnswerModel;
    is_correct: number;
    level_status: string;
    player: UserModel;
}

// Define a service using a base URL and expected endpoints
export const answerApi = createApi({
    reducerPath: 'answerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL}api/`,
        prepareHeaders: prepareHeaders,
    }),
    endpoints: (builder) => ({
        answerQuestion: builder.mutation<AnswerResponse, AnswerPost>({
            query: (answer) => ({
                url: 'answer_question/',
                method: 'POST',
                params: answer,
            }),
        }),
        skipQuestion: builder.mutation<AnswerResponse, SkipPost>({
            query: (post) => ({
                url: 'skip_question/',
                method: 'POST',
                params: post,
            }),
        })
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAnswerQuestionMutation, useSkipQuestionMutation } = answerApi
