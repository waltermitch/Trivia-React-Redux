import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AnswerModel from "../../app/models/AnswerModel";
import { answerApi } from "../../app/services/answer";
import { RootState } from '../../app/store';
import { returnLoadedResultAd, updateAdSlot } from '../../features/framer/utils/propUtils';
// import { updateAdSlot } from '../../features/framer/utils/propUtils';

export interface SkipAnswerModel {
  id: number;
  answer: string;
  explain_answer: string | undefined;
  explain_image: string | undefined;
  is_correct: number;
  level_status: string;
}

export interface AnswerState {
  answer: AnswerModel | null;
  adsConstantModel: {};
  adsDecisionMaker: {};
}

const initialState: AnswerState = {
  answer: null,
  adsConstantModel: {},
  adsDecisionMaker: {},

};

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    createDefaultSlots: (state, action: PayloadAction<any>) => {
      state.adsConstantModel = action.payload;
    },
    appendSlot: (state, action: PayloadAction<any>) => {
      state.adsDecisionMaker = returnLoadedResultAd(state.adsDecisionMaker, action.payload) // updateAdSlot(state.adsConstantModel, action.payload)
    },
    resetAdDecider: (state) => {
      state.adsDecisionMaker = initialState.adsDecisionMaker;
    },
    skipAnswer: (state, action: PayloadAction<any>) => {
      state.answer = action.payload.answer;
      // state.answer.level_status = action.payload.level_status;
      // state.answer.is_correct = 1;
    },
    resetAnswer: (state) => {
      state.answer = null;
      // state.adsConstantModel = []
    },
    updateAnswer: (state, action: PayloadAction<AnswerModel>) => {
      state.answer = action.payload;
    },
    resetAnswerSlice: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      answerApi.endpoints.answerQuestion.matchFulfilled,
      (state, { payload }) => {
        state.answer = payload.correct_answer
        state.answer.is_correct = payload.is_correct
        state.answer.level_status = payload.level_status
      }
    );
    builder.addMatcher(
      answerApi.endpoints.skipQuestion.matchFulfilled,
      (state, { payload }) => {
        state.answer = payload.answer
        state.answer.level_status = payload.level_status
        state.answer.is_correct = 1;
      }
    );
  },
});

export const { resetAnswer, updateAnswer, skipAnswer, appendSlot, createDefaultSlots, resetAdDecider, resetAnswerSlice } = answerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAnswer = (state: RootState) => state.answer.answer;
export const selectSlots = (state: RootState) => state.answer.adsConstantModel;
export const selectAdDecision = (state: RootState) => state.answer.adsDecisionMaker;

export default answerSlice.reducer;
