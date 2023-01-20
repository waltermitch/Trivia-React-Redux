import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import UserModel from '../models/UserModel'
import { randomString } from "../../utils/randomString";
import { prepareHeaders } from "../../utils/prepareHeaders";
import LevelDataModel from '../models/LevelDataModel';
import RankDataModel from '../models/RankDataModel';

export interface UserResponse {
    player: UserModel
    error?: string
    success?: boolean
}

export interface LevelResponse {
    levels: LevelDataModel
}
export interface RankResponse {
    rankings: RankDataModel
}





export interface LoginPost {
    email: string;
    password: string;
    new_password?: string;
    utm_source: string;
    utm_campaign: string;
}

export interface PlayerParams {
    utm_source: string;
    utm_campaign: string;
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: `${process.env.REACT_APP_BASE_URL}api/`,
            prepareHeaders: prepareHeaders,
        }),
    // keepUnusedDataFor: 5,
    endpoints: (builder) => ({
        getUser: builder.query<UserModel, Object>({
            query: (params: any) => ({
                url:
                    (params.utm_source !== undefined && params.utm_campaign !== undefined) ? `player_info/?utm_source=${params.utm_source}&utm_campaign=${params.utm_campaign}`
                        :
                        params?.utm_source !== undefined ? `player_info/?utm_source=${params.utm_source}` :
                            params?.utm_campaign !== undefined ? `player_info/?utm_campaign=${params.utm_campaign}` :
                                `player_info/`,
            }),
            transformResponse(response: UserResponse) {
                return response.player
            },
        }),
        login: builder.mutation<UserResponse, LoginPost>({
            query: (post) => ({
                url: 'player_login/',
                method: 'POST',
                params: post,
            }),
        }),
        register: builder.mutation<UserResponse, LoginPost>({
            query: (post) => ({
                url: 'player_register/',
                method: 'POST',
                params: post,
            }),
        }),
        changePassword: builder.mutation<UserResponse, LoginPost>({
            query: (post) => ({
                url: 'player_password_change/',
                method: 'POST',
                params: post,
            }),
        }),
        getLvlData: builder.query<LevelDataModel, void>({
            query: () => ({
                url: 'level_data/'
            }),
            transformResponse(response: LevelResponse) {
                return response.levels
            },
        }),
        getRank: builder.query<RankDataModel, void>({
            query: () => ({
                url: 'rank_data/'
            }),
            transformResponse(response: RankResponse) {
                return response.rankings
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useLoginMutation, useRegisterMutation, useChangePasswordMutation, useGetLvlDataQuery, useGetRankQuery } = userApi
