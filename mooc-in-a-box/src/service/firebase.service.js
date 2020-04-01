// import * as firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
import firebase from 'firebase'
import { useRadioGroup } from '@material-ui/core';

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


export const getUserById = userId => {
    return db.collection('Users').doc(userId).get();
}


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

export const updateUser = async (userId, updates) => {
    console.log("Update User Called");
    return db.collection('Users')
        .doc(userId)
        .set(updates, { merge: true })
}

export const createUser = async (userAuth) => {
    return db.collection('Users')
        .doc(userAuth.uid)
        .set({
            id: userAuth.uid,
            name: userAuth.displayName,
            photoURL: userAuth.photoURL,
            email: userAuth.email,
        },
            { merge: true }
        )
}

export const getCurrentUser = () => {
    var user = firebase.auth().currentUser;
    if (user) {
        return user;
    } else {
        return undefined;
    }
}

export const logUserInUser = async (isGoog) => {
    let provider;
    isGoog ? provider = new firebase.auth.GoogleAuthProvider() :
        provider = new firebase.auth.FacebookAuthProvider();
    let users = [];
    let currentUser = undefined;
    let authUser = undefined;
    // Get all users so we can see if the logged in one is one of ours.
    // TODO(jessi): store this data so we don't need to fetch it, or directly ask for the user
    // once they log in and if no user exists create one. Sounds like work.
    await getAllUsers()
        .then((queryResults) => {
            queryResults.forEach((doc) => {
                const user = doc.data();
                user.id = doc.id;
                users.push(user);
            })
        });

    return await firebase.auth().signInWithPopup(provider).then(async function (result) {
        authUser = result.user;
        users.forEach(u => {
            if (u.id === authUser.uid) {
                currentUser = u;
            }
        });
        // Didn't find an existing user.
        if (currentUser === undefined) {
            // Create new user
            await createUser(authUser).then(async () => {
                // Get the new user to return
                return getCurrentUser();
            }).catch(error => {
                console.log(error);
            });
        }
        return currentUser;
    }).catch(function (error) {
        console.log(error);
    });
}

export const signOut = async () => {
    return await firebase.auth().signOut().then(function () {
        document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return true;
    }).catch(function (error) {
        console.log(error);
        return false;
    });
}

export const deleteUser = async () => {
    var user = firebase.auth().currentUser;

    return await user.delete().then(function () {
        document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return true;
    }).catch(function (error) {
        console.log(error);
        return false;
    });
}


export const createCourse = async (user, courseInfo) => {
    var storage = firebase.storage();
    const userDocRef = db.doc(`Users/${user.id}`)
    const lessonRef = db.doc(courseInfo.chapter.lessons);
    courseInfo.chapter.lessons = lessonRef;
    return await db.collection('Course').add({
        owner: userDocRef,
        title: courseInfo.title,
        description: courseInfo.description,
        chapters: courseInfo.chapters
    })
        .then(async courseDoc => {
            let usersCreatedCourses;
            if (user.createdCoursesRefs && user.createdCoursesRefs.length > 0) {
                usersCreatedCourses = user.createdCoursesRefs;
            } else {
                usersCreatedCourses = []
            }

            const courseRef = db.doc(`Course/${courseDoc.id}`)
            usersCreatedCourses.push(courseRef);
            const updateObject = {
                createdCoursesRefs: usersCreatedCourses
            }

            return await updateUser(user.id, updateObject);
        })
}

export const favoriteCourse = async (user, courseInfo) => {
    const courseRef = db.doc(`Course/${courseInfo.id}`)
    let favoritedCourses;

    if (user.favoritedCoursesRefs && user.favoritedCoursesRefs.length > 0 ){
        favoritedCourses = user.favoritedCoursesRefs;
    } else {
        favoritedCourses = []
    }

    favoritedCourses.push(courseRef);

    const updateObject = {
        favoritedCoursesRefs: favoritedCourses
    }

    return await updateUser(user.id, updateObject);
}

export const removeFavoriteCourse = async (user, courseInfo) => {
    const courseRef = db.doc(`Course/${courseInfo.id}`)
    const favoritedCourses = user.favoritedCoursesRefs;
    favoritedCourses.splice(courseRef, 1);
    
    const updateObject = {
        favoritedCoursesRefs: favoritedCourses
    }

    return await updateUser(user.id, updateObject);

}


export const updateCourse = async (courseId, updates) => {
    console.log("Update Course Called");
    return db.collection('Course')
        .doc(courseId)
        .set(updates, { merge: true })
}

export const addNewChapter = async (course, newChapterInfo) => {
    const chapter = {} 
    chapter.title = newChapterInfo.title;
    chapter.description = newChapterInfo.description;
    chapter.id = 0
    chapter.lessonsRef = [];

    if (course.chapters && course.chapters.length > 0){
        course.chapters.push(chapter);
    } else {
        course.chapters = [];
        course.chapters.push(chapter);
    }

    const updateObject = {
        chapters: course.chapters
    }

    return await updateCourse(course.id, updateObject);

}

export const addNewLesson = async (course, chapterInfo, lessonInfo) => {

}