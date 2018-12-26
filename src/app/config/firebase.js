import { firebase } from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCYv9Gg4qCeMwlKPe2TeTY6OW3k7MC9_cs",
    authDomain: "revents-226204.firebaseapp.com",
    databaseURL: "https://revents-226204.firebaseio.com",
    projectId: "revents-226204",
    storageBucket: "revents-226204.appspot.com",
    messagingSenderId: "445889881951"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
