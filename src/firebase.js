// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBOrnDJlnai4qKmnYiL4m7GUz4iMLXDq9U',
  authDomain: 'slackbase-fcfc5.firebaseapp.com',
  databaseURL: 'https://slackbase-fcfc5-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'slackbase-fcfc5',
  storageBucket: 'slackbase-fcfc5.appspot.com',
  messagingSenderId: '384683849301',
  appId: '1:384683849301:web:ec3360109d87a6941f06dc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const storage = getStorage(app);

export default app;
