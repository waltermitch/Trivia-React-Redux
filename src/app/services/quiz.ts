import { QuizModel } from "../models/QuizModel";
import QuestionModel from "../models/QuestionModel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { randomString } from "../../utils/randomString";
import { prepareHeaders } from "../../utils/prepareHeaders";

export interface QuizResponse {
    error: boolean | null;
    current_quiz: {
        id: number;
        title: string;
        title_short: string;
        slug: string;
        description: string;
        featured_image: string;
        include_at_homepage: number;
        include_at_tagpage: number;
    };
    questions: QuestionModel[];
}
// Define a service using a base URL and expected endpoints
export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL}api/`,
        prepareHeaders: prepareHeaders,
    }),
    endpoints: (builder) => ({
        getQuiz: builder.query<QuizModel, void>({
            query: () => `get_questions/`,
            transformResponse(response: QuizResponse) {
                return {
                    id: response.current_quiz.id,
                    title: response.current_quiz.title,
                    title_short: response.current_quiz.title_short,
                    slug: response.current_quiz.slug,
                    description: response.current_quiz.description,
                    featured_image: response.current_quiz.featured_image,
                    include_at_homepage: response.current_quiz.include_at_homepage,
                    include_at_tagpage: response.current_quiz.include_at_tagpage,
                    questions: response.questions.slice().map(item => {
                        const img = new Image();
                        img.src = `${process.env.REACT_APP_BASE_URL}${item.image}`;
                        return {
                            ...item,
                            preloadImg: img
                        }
                    })
                };
            },
        }),
        getExtraQuiz: builder.query<QuizModel, String>({
            query: (param) => `get_extra_questions?question_ids=${param}`,
            transformResponse(response: QuizResponse) {
                return {
                    id: response.current_quiz.id,
                    title: response.current_quiz.title,
                    title_short: response.current_quiz.title_short,
                    slug: response.current_quiz.slug,
                    description: response.current_quiz.description,
                    featured_image: response.current_quiz.featured_image,
                    include_at_homepage: response.current_quiz.include_at_homepage,
                    include_at_tagpage: response.current_quiz.include_at_tagpage,
                    questions: response.questions.slice().map(item => {
                        const img = new Image();
                        img.src = `${process.env.REACT_APP_BASE_URL}${item.image}`;
                        return {
                            ...item,
                            preloadImg: img
                        }
                    })
                };
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQuizQuery, useGetExtraQuizQuery } = quizApi
