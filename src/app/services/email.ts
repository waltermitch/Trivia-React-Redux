import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {randomString} from "../../utils/randomString";
import {prepareHeaders} from "../../utils/prepareHeaders";

export interface EmailPost {
    email: string;
}

export interface EmailResponse {
    success: boolean;
    error: string;
}

// Define a service using a base URL and expected endpoints
export const emailApi = createApi({
    reducerPath: 'emailApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL}api/`,
        prepareHeaders: prepareHeaders,
    }),
    endpoints: (builder) => ({
        addEmail: builder.mutation<EmailResponse, EmailPost>({
            query: (answer) => ({
                url: 'add_email/',
                method: 'POST',
                params: answer,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddEmailMutation } = emailApi
