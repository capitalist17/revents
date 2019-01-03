const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.createActivity = functions.firestore.document('events/{eventId}').onCreate(event => {
    let newEvent = event.data();
  
    console.log(newEvent);
  
    const activity = {
        type: 'newEvent',
        eventDate: newEvent.date,
        hostedBy: newEvent.hostedBy,
        title: newEvent.title,
        photoURL: newEvent.hostPhotoURL,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: newEvent.hostUid,
        eventId: event.id
    }

    console.log(activity);
  
    return admin.firestore().collection('activity').add(activity)
      .then(docRef => {
        return console.log('Activity created with id: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
  });