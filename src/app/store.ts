import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import quizReducer from '../slices/quiz/quizSlice';
import answerReducer from '../slices/quiz/answerSlice';
import userReducer from '../slices/user/userSlice';
import adsReducer from '../slices/adsSlice';
import menuReducer from '../slices/account/menuSlice';
import subscriptionReducer from '../slices/account/subscriptionSlice';
import { userApi } from "./services/user";
import { quizApi } from "./services/quiz";
import { answerApi } from "./services/answer";
import { levelsApi } from "./services/levels";
import { adsApi } from "./services/ads";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    answer: answerReducer,
    // allAnswers: allAnswerReducer,
    user: userReducer,
    ads: adsReducer,
    accountMenu: menuReducer,
    subscription: subscriptionReducer,
    [adsApi.reducerPath]: adsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [answerApi.reducerPath]: answerApi.reducer,
    [levelsApi.reducerPath]: levelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(userApi.middleware)
      .concat(quizApi.middleware)
      .concat(answerApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
