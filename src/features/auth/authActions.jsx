import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
export const login = (creds) => {
  // Below is the normal way of doing things
  /*
  return {
    type: LOGIN_USER,
    payload: { creds }
  }
  */
  // Below is the thunk way of doing things
  return dispatch => {
    dispatch({type: LOGIN_USER,
              payload: {creds }
            })
    // close the modal after login has taken place
    dispatch(closeModal())
  }
} 

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}