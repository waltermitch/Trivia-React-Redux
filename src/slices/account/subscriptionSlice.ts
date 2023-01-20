import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SubscriptionsState {
    secretId: string | null;
    intentType: string | null;
    subscriptionEnabled: boolean | null;
}

const initialState: SubscriptionsState = {
    secretId: null,
    intentType: null,
    subscriptionEnabled: false
};

export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setSecret: (state, action: PayloadAction<string> ) => {
            state.secretId = action.payload;
        },
        setIntentType: (state, action: PayloadAction<string> ) => {
            state.intentType = action.payload;
        },
        toggleSubscription: (state, action: PayloadAction<boolean> ) => {
            state.subscriptionEnabled = action.payload;
        },
    },
});

export const {setSecret, toggleSubscription, setIntentType} = subscriptionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSecret = (state: RootState) => state.subscription.secretId;
export const selectSubscriptionEnabled = (state: RootState) => state.subscription.subscriptionEnabled;
export const selectSubscriptionIntentType = (state: RootState) => state.subscription.intentType;

export default subscriptionSlice.reducer;
