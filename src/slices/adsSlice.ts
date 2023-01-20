import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface AdsState {
    forceAds: boolean;
}

const initialState: AdsState = {
    forceAds: true //false client sad update this to true
};

export const adsSlice = createSlice({
    name: 'ads',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        toggleForceAds: (state, {payload}: PayloadAction<boolean>) => {
            state.forceAds = payload;
        },
    },
});

export const {toggleForceAds} = adsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectForceAds = (state: RootState) => state.ads.forceAds;

export default adsSlice.reducer;
