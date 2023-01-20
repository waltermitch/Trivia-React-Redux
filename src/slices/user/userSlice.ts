import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserModel from "../../app/models/UserModel";
import { answerApi } from "../../app/services/answer";
import { levelsApi } from '../../app/services/levels';
import { userApi } from "../../app/services/user";
import { RootState } from "../../app/store";

export interface UserState {
    hasErrors: boolean;
    user: UserModel | undefined,
    levels: any;
    ranks: any,
    next_levels: any
    previous_levels: any
}

export const initialState: UserState = {
    hasErrors: false,
    user: undefined,
    levels: [],
    ranks: [],
    next_levels: [],
    previous_levels: []
}

// A slice for recipes with our three reducers
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserOffline: (state, action: PayloadAction<any>) => {
            // state.answers.push(action.payload);
            state.user = action.payload.player
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.getUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload
            }
        );
        builder.addMatcher(
            userApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.player
            }
        );
        builder.addMatcher(
            userApi.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.player
            }
        );
        builder.addMatcher(
            answerApi.endpoints.answerQuestion.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.player
            }
        );
        builder.addMatcher(
            answerApi.endpoints.skipQuestion.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.player
            }
        );
        builder.addMatcher(
            userApi.endpoints.getLvlData.matchFulfilled,
            (state, { payload }) => {
                state.levels = payload
            }
        );
        builder.addMatcher(
            userApi.endpoints.getRank.matchFulfilled,
            (state, { payload }) => {
                state.ranks = payload
            }
        );
        builder.addMatcher(
            levelsApi.endpoints.getNextLevels.matchFulfilled,
            (state, { payload }) => {
                state.next_levels = payload
            }
        );
        builder.addMatcher(
            levelsApi.endpoints.getPreviousLevels.matchFulfilled,
            (state, { payload }) => {
                state.previous_levels = payload
            }
        );
    }
});

// Three actions generated from the slice
//export const { getUser, getUserSuccess, getUserFailure } = userSlice.actions

// A selector
export const selectUser = (state: RootState) => state.user.user
export const selectLevel = (state: RootState) => state.user.levels
export const selectRank = (state: RootState) => state.user.ranks
export const selectNextLevel = (state: RootState) => state.user.next_levels
export const selectPreviousLevel = (state: RootState) => state.user.previous_levels

export const { updateUserOffline } = userSlice.actions;
// The reducer
export default userSlice.reducer
