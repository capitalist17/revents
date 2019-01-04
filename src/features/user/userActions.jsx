import moment from 'moment';
import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import { asyncActionError, asyncActionStart, asyncActionFinish } from '../async/asyncActions';
import firebase from '../../app/config/firebase';
import { FETCH_EVENTS } from '../events/eventConstants'

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
        dispatch(asyncActionStart()); // this is a hook on the reducer as to when the action started

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
        await firestore.add({
                                collection: 'users',
                                doc: user.uid,
                                subcollections: [{ collection: 'photos' }]
                            }, 
                            {
                                name: imageName,
                                url: downloadURL
                            })
        
        dispatch(asyncActionFinish()); // this is a hook on the reducer to indicate the action completion
    } catch (error) {
        console.log(error)
        dispatch(asyncActionError()); // this is a hook on the reducer to indicate if there was an error
        throw new Error('Problem uploading photo')
    }
}

export const deletePhoto = (photo) => 
// getFirebase - for firebase storage
// getFirestore - for firebase firestore database
// dispatch & getState are provided by thunk (It is used to pass methods instead of plain object in action)
async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;    
    try {
        // delete the document in firebase storage
        await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
        // delete the document in firebase firestore database
        await firestore.delete({
                                    collection: 'users',
                                    doc: user.uid,
                                    subcollections: [{ collection: 'photos', doc:photo.id }]
                                })
    } catch (error) {
        console.log(error)
        throw new Error('Problem deleting the photo')
    }
}

export const setMainPhoto = photo => 
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      return await firebase.updateProfile({
                                photoURL: photo.url
                            })
    } catch (error) {
      console.log(error);
      throw new Error('Problem setting main photo')
    }
  }

  export const goingToEvent = (event) => 
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        const attendee = {
            going: true,
            joinDate: Date.now(),
            photoURL: photoURL || '/assets/user.png',
            displayName: user.displayName,
            host: false
        }
        try {
            await firestore.update(`events/${event.id}`,{
                [`attendees.${user.uid}`]: attendee
            })
            // Add the details to the event_attendee lookup collection as well
            await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
                eventId: event.id,
                userUid: user.uid,
                eventDate: event.date,
                host: false
            })
            toastr.success('Success', 'You have signed up to the event');
        } catch (error) {
            console.log(error)     
            toastr.error('Oops!', 'Problem signing up to this event')
        }
    }

export const cancelGoingToEvent = (event) => 
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${user.uid}`]: firestore.FieldValue.delete()
            })
            // Remove from the lookup table/collection as well
            await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
            toastr.success('Success', 'You have removed yourself from the event');
        } catch (error) {
        console.log(error)     
        toastr.error('Oops!', 'Something went wrong')
        }
    }

export const getUserEvents = (userUid, activeTab) => 
async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const today = new Date(Date.now());
    let eventsRef = firestore.collection('event_attendee');
    let query;

    switch (activeTab) {
        case 1: // past events
          query = eventsRef.where('userUid', '==', userUid).where('eventDate', '<=', today)
                            .orderBy('eventDate', 'desc');
          break;
        case 2: // future events
          query = eventsRef.where('userUid', '==', userUid).where('eventDate', '>=', today)
                            .orderBy('eventDate');
          break;
        case 3: // hosted events
          query = eventsRef.where('userUid', '==', userUid).where('host', '==', true)
                            .orderBy('eventDate', 'desc');
          break;
        default:
          query = eventsRef.where('userUid', '==', userUid).orderBy('eventDate', 'desc');
    }
    
    try {
        let querySnap = await query.get();
        let events = [];

        for (let i=0; i<querySnap.docs.length; i++) {
            let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
            events.push({...evt.data(), id: evt.id})
        }
      
        dispatch({type: FETCH_EVENTS, payload: {events}})
        dispatch(asyncActionFinish());
    } catch (error) {
        console.log(error);
        dispatch(asyncActionError());
    }
}

export const followUser = userToFollow => 
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        const following = {
            photoURL: userToFollow.photoURL || '/assets/user.png',
            city: userToFollow.city || 'unknown city',
            displayName: userToFollow.displayName
        }
        try {
        await firestore.set(
            {
            collection: 'users',
            doc: user.uid,
            subcollections: [{collection: 'following', doc: userToFollow.id}]
            },
            following
        );
        } catch (error) {
            console.log(error);
        }
    }