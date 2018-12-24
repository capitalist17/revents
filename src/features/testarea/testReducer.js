import { INCREMENT_COUNTER, DECREMENT_COUNTER,
        COUNTER_ACTION_STARTED ,COUNTER_ACTION_FINISHED } from './testConstants';
// import { createReducer } from '../../app/common/util/reducerUtil'

const initialState = {
  data: 53,
  loading: false
}; 

// if state is not provided then initialState is used
const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, data: state.data + 1 };
    case DECREMENT_COUNTER:
      return { ...state, data: state.data - 1 };
    case COUNTER_ACTION_STARTED:
      return { ...state, loading: true };
    case COUNTER_ACTION_FINISHED:
    return { ...state, loading: false };
    default:
      return state;
  }
};

export default testReducer;

/* ***** Author likes the following method. Personally I prefer the switch method above *****  */

// export const incrementCounter = (state, payload) => {
//   return { ...state, data: state.data + 1 };
// }

// export const decrementCounter = (state, payload) => {
//   return { ...state, data: state.data - 1 };
// }

// export default createReducer(initialState, {
//   [INCREMENT_COUNTER]: incrementCounter,
//   [DECREMENT_COUNTER]: decrementCounter
// });
