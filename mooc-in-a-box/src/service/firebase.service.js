// import * as firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyA8tAHYGUiNkFHq6452W4Qr79eibVmtRZA",
    authDomain: "mooc-in-a-box.firebaseapp.com",
    databaseURL: "https://mooc-in-a-box.firebaseio.com",
    projectId: "mooc-in-a-box",
    storageBucket: "mooc-in-a-box.appspot.com",
    messagingSenderId: "594314585164",
    appId: "1:594314585164:web:3ae152452d1c238af100e9",
    measurementId: "G-LXH34JCXZS"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export const getCourseById = courseId => {
    return db.collection('Course')
        .doc(courseId)
        .get();
};

export const getAllCourses = () => {
    return db.collection('Course').get();
}