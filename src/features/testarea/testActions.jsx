import { INCREMENT_COUNTER, DECREMENT_COUNTER,
        COUNTER_ACTION_STARTED ,COUNTER_ACTION_FINISHED } from './testConstants';

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  }
}

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  }
}

export const startCounterAction = () => {
  return {
    type: COUNTER_ACTION_STARTED
  }
}

export const finishCounterAction = () => {
  return {
    type: COUNTER_ACTION_FINISHED
  }
}

// promise me to execute the function callback that I provide after some time 
const delay = (milliSec) => {
  return new Promise(someCallbackToResolve => setTimeout(someCallbackToResolve, milliSec) )
}

export const incrementAsync = () => {
  return async dispatch => {
    dispatch(startCounterAction());
    await delay(1000);
    dispatch({type: INCREMENT_COUNTER});
    dispatch(finishCounterAction());
  }
}

export const decrementAsync = () => {
  return async dispatch => {
    dispatch(startCounterAction());
    await delay(1000);
    dispatch({type: DECREMENT_COUNTER});
    dispatch(finishCounterAction());
  }
}