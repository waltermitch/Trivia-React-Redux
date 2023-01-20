import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {prepareHeaders} from "../../utils/prepareHeaders";

export interface ContactPost {
    email: string;
    name: string;
    message: string;
}

export interface ContactResponse {
    success: boolean;
}

// Define a service using a base URL and expected endpoints
export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL}`,
        prepareHeaders: prepareHeaders,
    }),
    endpoints: (builder) => ({
        sendEmail: builder.mutation<ContactResponse, ContactPost>({
            query: (args) => ({
                url: 'contact',
                method: 'POST',
                params: args,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSendEmailMutation } = contactApi
