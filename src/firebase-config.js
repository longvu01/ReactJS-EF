import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDcCxM4Tpi5TFo5Ho94wlKATix7BHUdRGE',
  authDomain: 'ez-shop-llv-be743.firebaseapp.com',
  projectId: 'ez-shop-llv-be743',
  storageBucket: 'ez-shop-llv-be743.appspot.com',
  messagingSenderId: '178431056248',
  appId: '1:178431056248:web:7a221f07f8e3133742908d',
  measurementId: 'G-NST8CQ24KF',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
