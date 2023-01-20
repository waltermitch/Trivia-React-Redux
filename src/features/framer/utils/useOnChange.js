import { useEffect } from 'react';
//@ts-ignore
import {
  isMotionValue
} from './isMotionValue.js';

export function useOnChange(value, callback) {
  useEffect(() =>// @ts-ignore this should be detected as a MV :shrug:
    isMotionValue(value) ? value.onChange(callback) : undefined
  );
}

export function useMultiOnChange(values, handler) {
  useEffect(() => {
    const subscriptions = values.map((value) => value.onChange(handler));
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  });
}
