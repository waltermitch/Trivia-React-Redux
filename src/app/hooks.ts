import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {useMemo} from "react";
import {selectAnswer, selectSlots,selectAdDecision} from "../slices/quiz/answerSlice";
import {selectQuestion, selectQuiz} from "../slices/quiz/quizSlice";
import { selectUser,selectLevel, selectRank,selectPreviousLevel,selectNextLevel} from "../slices/user/userSlice";
import {selectForceAds} from "../slices/adsSlice";
import {selectSubscriptionEnabled, toggleSubscription} from "../slices/account/subscriptionSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAnswer = () => {
    const answer = useSelector(selectAnswer)

    return useMemo(() => (answer), [answer])
}
export const useSlots = () => {
    const slots = useSelector(selectSlots)

    return useMemo(() => (slots), [slots])
}

export const useQuiz = () => {
    const quiz = useSelector(selectQuiz)

    return useMemo(() => (quiz), [quiz])
}

export const useQuestion = () => {
    const question = useSelector(selectQuestion)

    return useMemo(() => (question), [question])
}

export const useUser = () => {
    const user = useSelector(selectUser)

    return useMemo(() => (user), [user])
}
export const useLevel = () => {
    const levels = useSelector(selectLevel)
    return useMemo(() => (levels), [levels])
}
export const useNextLevel = () => {
    const nextLevels = useSelector(selectNextLevel)
    return useMemo(() => (nextLevels), [nextLevels])
}
export const usePreviousLevel = () => {
    const previousLevel = useSelector(selectPreviousLevel)
    return useMemo(() => (previousLevel), [previousLevel])
}
export const useRank = () => {
    const rank = useSelector(selectRank)
    return useMemo(() => (rank), [rank])
}

export const useForceAds = () => {
    const forceAds = useSelector(selectForceAds)

    return useMemo(() => (forceAds), [forceAds])
}

export const useSubscriptionEnabled = () => {
    const subscriptionEnabled = useSelector(selectSubscriptionEnabled)

    return useMemo(() => (subscriptionEnabled), [subscriptionEnabled])
}
export const useAdDecisionMaker = () => {
    const adDecision = useSelector(selectAdDecision)
    return useMemo(() => (adDecision), [adDecision])
}
