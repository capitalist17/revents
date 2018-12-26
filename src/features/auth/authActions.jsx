import { SubmissionError } from 'redux-form';
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
  }
} 

// curly braces indicate that we are returning something. 
//Round braces indicate that nothing is returned. 
export const registerUser = (user) => (
  // we need both firebase and firestore in this case. Firebase for authentication 
  // and firestore is where we are storing the user profile
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // create the user in auth in firebase
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      console.log(createdUser)

      // update the auth profile in firestore
      await createdUser.updateProfile({
        displayName: user.displayName
      })

      // create a new auth profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      await firestore.set(`users/${createdUser.uid}`,{...newUser})

      //Close the modal
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
  }
)