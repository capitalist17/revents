const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const newActivity = (type, event, id) => {
    return {
        type: type,
        eventDate: event.date,
        hostedBy: event.hostedBy,
        title: event.title,
        photoURL: event.hostPhotoURL,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: event.hostUid,
        eventId: id
    };
};

exports.createActivity = functions.firestore.document('events/{eventId}').onCreate(event => {
    let newEvent = event.data();
  
    console.log(newEvent);
  
    const activity = newActivity('newEvent', newEvent, event.id);

    console.log(activity);
  
    return admin.firestore().collection('activity').add(activity)
      .then(docRef => {
        return console.log('Activity created with id: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
  });

exports.cancelActivity = functions.firestore.document('events/{eventId}').onUpdate((updtEvent, context) => {
    let updatedEvent = updtEvent.after.data();
    let previousEventData = updtEvent.before.data();
    console.log({ updtEvent });
    console.log({ context });
    console.log({ updatedEvent });
    console.log({ previousEventData });
  
    if (!updatedEvent.cancelled || updatedEvent.cancelled === previousEventData.cancelled) {
      return false;
    }
  
    const activity = {
        type: 'cancelledEvent',
        eventDate: updatedEvent.date,
        hostedBy: updatedEvent.hostedBy,
        title: updatedEvent.title,
        photoURL: updatedEvent.hostPhotoURL,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: updatedEvent.hostUid,
        eventId: context.params.eventId
    }

    console.log({ activity });
  
    return admin.firestore().collection('activity').add(activity)
      .then(docRef => {
        return console.log('Activity created with id: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
});

exports.userFollowing = functions.firestore
  .document("users/{followerUid}/following/{followingUid}")
  .onCreate((event, context) => {
    console.log("v1");
    const followerUid = context.params.followerUid;
    const followingUid = context.params.followingUid;

    const followerDoc = admin
      .firestore()
      .collection("users")
      .doc(followerUid);

    console.log(followerDoc);

    return followerDoc.get().then(doc => {
      let userData = doc.data();
      console.log({ userData });
      let follower = {
        displayName: userData.displayName,
        photoURL: userData.photoURL || "/assets/user.png",
        city: userData.city || "unknown city"
      };
      return admin
        .firestore()
        .collection("users")
        .doc(followingUid)
        .collection("followers")
        .doc(followerUid)
        .set(follower);
    });
  });