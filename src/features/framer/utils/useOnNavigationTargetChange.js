import { useIsInCurrentNavigationTarget } from 'framer';
import { useEffect } from 'react';

export function useOnEnter(onEnter, enabled) {
  return useOnSpecificTargetChange(true, onEnter, enabled);
}

export function useOnExit(onExit, enabled) {
  return useOnSpecificTargetChange(false, onExit, enabled);
}

function useOnSpecificTargetChange(goal, callback, enabled = true) {
  const isInTarget = useIsInCurrentNavigationTarget();
  useEffect(() => {
    if (enabled && isInTarget === goal) callback();
  }, [
    goal, callback, enabled, isInTarget
  ]);
}
