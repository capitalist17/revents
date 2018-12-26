import { SubmissionError } from 'redux-form';
import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
export const login = (creds) => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const {email,password} = creds
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch(closeModal())
    } catch (error) {
      console.log(error);
      throw new SubmissionError({ _error: error.message })
    }
    //dispatch({type: LOGIN_USER, payload: {creds } })
    
  }
} 

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}