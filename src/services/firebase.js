import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJKX36_dX1a6_C9lIDF3CjegWunC-I04s',
  authDomain: 'frontendcodigo.firebaseapp.com',
  databaseURL: 'https://frontendcodigo-default-rtdb.firebaseio.com',
  projectId: 'frontendcodigo',
  storageBucket: 'frontendcodigo.appspot.com',
  messagingSenderId: '241511459420',
  appId: '1:241511459420:web:bfc94177530895819c9499',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
