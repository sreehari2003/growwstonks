/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from "react";

const debounce = (fn: Function, t = 5000) => {
  let timeDelay: NodeJS.Timeout;

  if (timeDelay) {
    clearTimeout(timeDelay);
  }

  timeDelay = setTimeout(() => {
    fn();
  }, t);
};

export const useDebounce = useCallback((fn: Function) => {
  debounce(fn);
}, []);
