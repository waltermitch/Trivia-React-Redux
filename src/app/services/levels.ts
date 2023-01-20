import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { randomString } from "../../utils/randomString";
import LevelModel from "../models/LevelModel";
import { prepareHeaders } from "../../utils/prepareHeaders";

// Define a service using a base URL and expected endpoints
export const levelsApi = createApi({
    reducerPath: 'levelsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL}api/`,
        prepareHeaders: prepareHeaders,
    }),
    endpoints: (builder) => ({
        getNextLevels: builder.query<LevelModel[], void>({
            query: () => `get_next_levels/`,
            transformResponse(response: any) {
                return response
            },
        }),
        getPreviousLevels: builder.query<LevelModel[], void>({
            query: () => `get_previous_levels/`,
            transformResponse(response: any) {
                return response
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNextLevelsQuery, useGetPreviousLevelsQuery } = levelsApi
