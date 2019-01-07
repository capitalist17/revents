import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
//import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = {
  currentUser: {}
}

// export const loginUser = (state, payload) => {
//   return {
//     ...state,
//     authenticated: true,
//     currentUser: payload.creds.email 
//   }
// }

// export const signOutUser = (state, payload) => {
//   return {
//     ...state,
//     authenticated: false,
//     currentUser: {}
//   }
// }

// export default createReducer(initialState, {
//   [LOGIN_USER]: loginUser,
//   [SIGN_OUT_USER]: signOutUser
// })

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, authenticated: true, currentUser: action.payload.creds.email };
    case SIGN_OUT_USER:
      return { ...state, authenticated: false, currentUser: {} };
    default:
      return state;
  }
};

export default authReducer;