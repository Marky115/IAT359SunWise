import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getAuth, initializeAuth, getReactNativePersistence  } from "firebase/auth";  
import { getFirestore } from "firebase/firestore";  

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3uEQt_mZV6js44IizaHjGK8kLhjTwsXU",
    authDomain: "iat359-lab6.firebaseapp.com",
    projectId: "iat359-lab6",
    storageBucket: "iat359-lab6.appspot.com",
    messagingSenderId: "326960630710",
    appId: "1:326960630710:web:ede4221489c8d7297c0f17"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
// get the firestore database object
export const db = getFirestore(firebase_app);
export const auth = initializeAuth(firebase_app,{
  persistence: getReactNativePersistence(AsyncStorage)
});