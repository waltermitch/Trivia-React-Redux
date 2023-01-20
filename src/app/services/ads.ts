import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {randomString} from "../../utils/randomString";
import LevelModel from "../models/LevelModel";
import {prepareHeaders} from "../../utils/prepareHeaders";
import AdModel from "../models/AdModel";

// Define a service using a base URL and expected endpoints
export const adsApi = createApi({
    reducerPath: 'adsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL}api/`,
        prepareHeaders: prepareHeaders,
    }),
    endpoints: (builder) => ({
        getAdsConfig: builder.query<AdModel, void>({
            query: () => 'ads/'
        }),
    })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAdsConfigQuery } = adsApi
