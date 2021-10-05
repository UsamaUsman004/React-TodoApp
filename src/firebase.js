import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBx4grpYuOpHfpFRRrlzBhtZwfQkotcaHM",
  authDomain: "reacttodoapp-4643a.firebaseapp.com",
  projectId: "reacttodoapp-4643a",
  storageBucket: "reacttodoapp-4643a.appspot.com",
  messagingSenderId: "541416024823",
  appId: "1:541416024823:web:e4fe51af6afae48ebf41f2"
};


initializeApp(firebaseConfig);
export const db = getFirestore();