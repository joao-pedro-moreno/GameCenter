import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAedJyuQOVCV2_yHJcLlqqkOemBu5CbGrs',
  authDomain: 'gamecenter-app-masters.firebaseapp.com',
  databaseURL: 'https://gamecenter-app-masters-default-rtdb.firebaseio.com',
  projectId: 'gamecenter-app-masters',
  storageBucket: 'gamecenter-app-masters.appspot.com',
  messagingSenderId: '425050044359',
  appId: '1:425050044359:web:488a680d8f5e4075204be2',
  measurementId: 'G-5V4NQCC1C9',

  // apiKey: 'AIzaSyDSK0A2rL3r8hKHL_fIahm-OUjFZPJhC2Q',
  // authDomain: 'gamecenter-2810b.firebaseapp.com',
  // projectId: 'gamecenter-2810b',
  // storageBucket: 'gamecenter-2810b.appspot.com',
  // messagingSenderId: '727222365150',
  // appId: '1:727222365150:web:082dc492947cff87774b4f',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
