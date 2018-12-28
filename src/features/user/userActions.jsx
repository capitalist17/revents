import moment from 'moment';
import cuid from 'cuid';
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

export const uploadProfileImage = (file, fileName) => 
async (dispatch, getState, {getFirebase, getFirestore}) => {
    const imageName = fileName+"-"+cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();

    // Each user will have his own folder to store the profile images.
    const user = firebase.auth().currentUser;    
    const path = `${user.uid}/user_images`;
    // Specify the options for firebase storage
    const options = {
        name: imageName
    };
    try {
        // upload the file to fb storage
        let uploadedFile = await firebase.uploadFile(path, file, null, options);
        // get url of image
        let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
        // get the userdoc from firestore
        let userDoc = await firestore.get(`users/${user.uid}`);
        // check if user has photo, if not update profile
        if (!userDoc.data().photoURL) {
            // Update the profile information in firestore document
            await firebase.updateProfile({
              photoURL: downloadURL
            });
            // Update the profile in firebase authentication. 
            // (seems counter-intuitive but will have to live with that fact)
            await user.updateProfile({
              photoURL: downloadURL
            });
          }
        // add the new photo to photos collection
        return await firestore.add({
                                collection: 'users',
                                doc: user.uid,
                                subcollections: [{ collection: 'photos' }]
                            }, 
                            {
                                name: imageName,
                                url: downloadURL
                            })
    } catch (error) {
        console.log(error)
        throw new Error('Problem uploading photo')
    }
}