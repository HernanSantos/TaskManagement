// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, onSnapshot } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB62MaEzBlaBIZW-0Eyb4Lr8j1c5vuDpzc",
  authDomain: "task-manager-app-1ae2d.firebaseapp.com",
  projectId: "task-manager-app-1ae2d",
  storageBucket: "task-manager-app-1ae2d.appspot.com",
  messagingSenderId: "759442346185",
  appId: "1:759442346185:web:686fdf5a6875e3342fbd18"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth (FirebaseApp);
export const FirebaseDB = getFirestore (FirebaseApp);

const collectionRef = collection(FirebaseDB, "user1/9N87rMRgJdBiNDNKqASb/notes")

// export const getData = onSnapshot(collectionRef, (capture)=>{
//   const taskList = []
//   capture.docs.forEach((doc) => {
//     taskList.push({...doc.data(), id:doc.id})
//   })
//   console.log(taskList)
// })