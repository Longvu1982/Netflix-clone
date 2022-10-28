import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDsL1FBW23O7a4lJ-KqB7EVtPToVVpnzuQ",
	authDomain: "netflix-clone-kris.firebaseapp.com",
	projectId: "netflix-clone-kris",
	storageBucket: "netflix-clone-kris.appspot.com",
	messagingSenderId: "280413386496",
	appId: "1:280413386496:web:361cc50901e97898e7a5e5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const KrisDB = firebaseApp.firestore();
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default KrisDB;
