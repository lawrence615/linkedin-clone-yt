
// import {initializeApp} from 'firebase/'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, onSnapshot } from 'firebase/firestore';

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
// const auth = firebase.auth()

export {db, collection, addDoc, getDocs, query, onSnapshot}