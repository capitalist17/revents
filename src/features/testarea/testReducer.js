import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants';
import { createReducer } from '../../app/common/util/reducerUtil'

const initialState = {
  data: 53
}; 

// if state is not provided then initialState is used
const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, data: state.data + 1 };
    case DECREMENT_COUNTER:
      return { ...state, data: state.data - 1 };
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
