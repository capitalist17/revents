import moment from 'moment';
import { toastr } from 'react-redux-toastr'

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const {isLoaded, isEmpty, ...updatedUser} = user; 
        if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
        }

        try {
            // updateProfile is a method from react-redux-firebase and is responsible for updating
            // the user profile document inside of firestore
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Profile updated')
        } catch (error) {
            console.log(error)
        }
    }

    // Note: for this action we dont define any of our own Reducers. 
    // All the reducers are defined by firebase and firestore reducers 