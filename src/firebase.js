// ! Connecting Firebase to our React frontend - it's this simple

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAEQdwj4GuNAeqlrJ4f_KdWTDADOj1uIWQ',
  authDomain: 'clone-1c3e2.firebaseapp.com',
  projectId: 'clone-1c3e2',
  storageBucket: 'clone-1c3e2.appspot.com',
  messagingSenderId: '178653151181',
  appId: '1:178653151181:web:3100dd046899d283fc4e84',
  measurementId: 'G-014BCW77B9',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
//* This auth is everything that we need in order to get the authentication login sign in and all
