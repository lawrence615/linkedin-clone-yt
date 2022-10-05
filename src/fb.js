
// import {initializeApp} from 'firebase/'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCX8wf3xhjbZIAf_LLuvUtkPbtdI3xozXs",
  authDomain: "linkedin-clone-yt-751bc.firebaseapp.com",
  projectId: "linkedin-clone-yt-751bc",
  storageBucket: "linkedin-clone-yt-751bc.appspot.com",
  messagingSenderId: "175674726771",
  appId: "1:175674726771:web:7d8dc35a0394ac91de8d06",
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app);

export {db, auth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, collection, addDoc, getDocs, query, orderBy, onSnapshot}