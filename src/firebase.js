import firebase from 'firebase';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "react-netflix-a0aad.firebaseapp.com",
  projectId: "react-netflix-a0aad",
  storageBucket: "react-netflix-a0aad.appspot.com",
  messagingSenderId: "1086918823490",
  appId: "1:1086918823490:web:43eb6339406c9f61bce7db"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const auth = firebase.auth();

export default db;