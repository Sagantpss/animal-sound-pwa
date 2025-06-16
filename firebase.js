import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCl4M9AK323aCYbovade3YxZwh-LKq34EU',
  authDomain: 'animal-sound-pwa.firebaseapp.com',
  projectId: 'animal-sound-pwa',
  storageBucket: 'animal-sound-pwa.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef123456'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();