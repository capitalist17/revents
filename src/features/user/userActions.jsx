import moment from 'moment';
import { toastr } from 'react-redux-toastr'

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        if (user.dateOfBirth) {
            user.dateOfBirth = moment(user.dateOfBirth).toDate();
        }

        try {
            // updateProfile is a method from react-redux-firebase and is responsible for updating
            // the user profile document inside of firestore
            await firebase.updateProfile(user);
            toastr.success('Success', 'Profile updated')
        } catch (error) {
            console.log(error)
        }
    }

    // Note: for this action we dont define any of our own Reducers. 
    // All the reducers are defined by firebase and firestore reducers 