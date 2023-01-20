import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AccountMenuState {
    opened: boolean;
}

const initialState: AccountMenuState = {
    opened: false
};

export const menuSlice = createSlice({
    name: 'accountMenu',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        toggleOpened: (state, action: PayloadAction<boolean> ) => {
            state.opened = action.payload;
        },
    },
});

export const {toggleOpened} = menuSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMenuOpened = (state: RootState) => state.accountMenu.opened;

export default menuSlice.reducer;
