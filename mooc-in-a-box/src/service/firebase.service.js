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

export const getAllUsers = () => {
    return db.collection('Users').get();
}

export const updateUser = (userId, updates) => {
    return db.collection('Users')
                .doc(userId)
                .set(updates, { merge: true })
}

export const createUser = async (userAuth) => {
    return db.collection('Users')
                .doc(userAuth.uid)
                .set({
                    name: userAuth.displayName,
                    photoURL: userAuth.photoURL,
                    email: userAuth.email},
                    { merge: true }
                )
}

export const getUserById = userId => {
    return db.collection('Users')
        .doc(userId)
        .get();
}

export const logUserInGoogle = async () => {
    console.log('fb service login w goog')
    var provider = new firebase.auth.GoogleAuthProvider();
    let users = [];
    let currentUser = undefined;
    let authUser = undefined;
    await getAllUsers()
        .then( (queryResults) => {
          queryResults.forEach( (doc) => {
            const user = doc.data();
            user.id = doc.id;
            users.push(user);
          })
        });

    return await firebase.auth().signInWithPopup(provider).then(async function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        authUser = result.user;
        // let currentUser = undefined;
        // ...
        users.forEach(u => {
            if (u.id === authUser.uid) {
                currentUser = u;
            }
        });
        console.log(users);
        if (currentUser === undefined) {

            console.log(currentUser);
            
            //create new user
            await createUser(authUser).then(async () => {
                // get the new user to return
               return await getUserById(authUser.uid)
               .then(result => {
                   if (result.exists) {
                     currentUser = result.data();
                     return result.data();
                   } else {
                       console.log("result no exist")
                   }
                }).catch(error => {
                    console.log(error);    
                });
            }).catch( error => {
                console.log(error)
                
            });
        }
        console.log(currentUser)
        return currentUser;
        // return user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

export const logUserInFacebook = async () => {
    console.log('fb service login w fb')
    // var provider = new firebase.auth.GoogleAuthProvider();
    let users = [];
    await getAllUsers()
        .then( (queryResults) => {
          queryResults.forEach( (doc) => {
            const user = doc.data();
            user.id = doc.id;
            user.authToken = doc.authToken;
            users.push(user);
          })
        })

}