import firebase from 'firebase'


/**
 * Firebase Set Up
 */
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
var storageRef = firebase.storage().ref();



/*
* -----------------------------------------------------------
*  USER Functions
* -----------------------------------------------------------
*/

export const getUserById = userId => {
    return db.collection('Users').doc(userId).get();
}

export const getAllUsers = () => {
    return db.collection('Users').get();
}

export const updateUser = async (userId, updates) => {
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



/*
* -----------------------------------------------------------
*  Course Functions
* -----------------------------------------------------------
*/

export const getCourseById = courseId => {
    return db.collection('Course')
        .doc(courseId)
        .get()
        .then(async courseResult => {
            if (courseResult.exists) {
                const course = courseResult.data();
                course.id = courseId;
                return course;
            } else {
                return null
            }
        });
};

export const getAllCourses = () => {
    return db.collection('Course').get();
}


export const addImage = (courseId, imageFile) => {
    const courseImageRef = storageRef.child(`images/courses/${courseId}/${imageFile.name}`);
    return courseImageRef.put(imageFile);
}

export const getImageUrl = (courseId, imageFile) => {
    const courseImageRef = storageRef.child(`images$s/${courseId}/${imageFile.name}`);
    return courseImageRef.getDownloadURL();

}

export const createCourse = async (user, courseInfo) => {
    const userDocRef = db.doc(`Users/${user.id}`)

    const newCourseObj = {
        owner: userDocRef,
        title: courseInfo.title,
        description: courseInfo.description,
        chapters: courseInfo.chapters
    }

    if (courseInfo.overview) {
        newCourseObj.overview = JSON.stringify(courseInfo.overview)
    }

    // Create Course
    return await db.collection('Course').add(newCourseObj)
        .then(async courseDoc => {

            let usersCreatedCourses;
            if (user.createdCoursesRefs && user.createdCoursesRefs.length > 0) {
                usersCreatedCourses = user.createdCoursesRefs;
            } else {
                usersCreatedCourses = []
            }
            const courseRef = db.doc(`Course/${courseDoc.id}`)
            usersCreatedCourses.push(courseRef);

            console.log('Course In Firebase Service', courseDoc);

            // Check If Image Was Included
            if(courseInfo.thumbnailFile){
                // Upload Image
                return await addImage(courseDoc.id, courseInfo.thumbnailFile)
                    .then( async imageRef => {

                       return await getImageUrl(courseDoc.id, courseInfo.thumbnailFile)
                        .then( async imageUrl => {
                            const courseUpdate = {
                                thumbnailUrl: imageUrl
                            };

                            return await updateCourse(courseDoc.id, courseUpdate )
                                .then( async courseDocWithImage => {                                                                
                                    const updateObject = {
                                        createdCoursesRefs: usersCreatedCourses
                                    }

                                return await updateUser(user.id, updateObject);
                            })
                        })
                    });
            } else {
                // No Image
                const updateObject = {
                    createdCoursesRefs: usersCreatedCourses
                }
                return await updateUser(user.id, updateObject);
            }
        })
}

export const favoriteCourse = async (user, courseInfo) => {
    const courseRef = db.doc(`Course/${courseInfo.id}`)
    let favoritedCourses;

    if (user.favoritedCoursesRefs && user.favoritedCoursesRefs.length > 0) {
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
    const favoritedCourses = user.favoritedCoursesRefs.filter(item => item.id !== courseInfo.id);
    const updateObject = {
        favoritedCoursesRefs: favoritedCourses
    }

    return await updateUser(user.id, updateObject);
}


export const updateCourse = async (courseId, updates) => {

    if (updates.overview) {
        updates.overview = JSON.stringify(updates.overview);
    }

    if( updates.thumbnailFile) {
        return await addImage(courseId, updates.thumbnailFile)
            .then( async imageRef => {

           return await getImageUrl(courseId, updates.thumbnailFile)
            .then( async imageUrl => {

                delete updates.thumbnailFile;
                updates.thumbnailUrl = imageUrl

                return db.collection('Course')
                .doc(courseId)
                .set(updates, { merge: true });
            })
        })
    } else{ 
        return db.collection('Course')
            .doc(courseId)
            .set(updates, { merge: true });
    }
}


const deleteCourseInFirebase = async (courseId) => {

    return db.collection('Course').doc(courseId).delete().then( async courseDeletedResult => {
        return await getAllUsers().then(async (queryResults) => {
            const updateUsersPromises = []

            queryResults.forEach((doc) => {
                let updateUser = false;
                const user = doc.data();
                user.id = doc.id;
                // const createdCoursesRefLength =  user.createdCoursesRefs?.length();
                // const favoritedCourseRefs = user.favoritedCoursesRefs?.length();
                
                if(user.createdCoursesRefs && user.createdCoursesRefs.length > 0) {
                    const createdCoursesRefLength =  user.createdCoursesRefs.length;
                    user.createdCoursesRefs = user.createdCoursesRefs.filter( courseRef => courseRef.id !== courseId );
                    if (user.createdCoursesRefs.length !== createdCoursesRefLength){
                        updateUser = true;
                    }
                }

                if(user.favoritedCourseRefs && user.favoritedCourseRefs.length > 0){
                    const favoritedCourseRefs = user.favoritedCoursesRefs.length;
                    user.favoritedCourseRefs = user.favoritedCoursesRefs.filter( courseRef => courseRef.id !== courseId);
                    if (user.favoritedCourseRefs.length !== favoritedCourseRefs) {
                        updateUser = true;
                    }
                }
        
                if (updateUser){
                    updateUsersPromises.push( db.collection('Users').doc(user.id).set(user, { merge: true }) );
                }
            })

            return await Promise.all(updateUsersPromises);
        })
    });
}


const deleteAllChapters= async (course) => {
    console.log("Calling in here");
    const arrayOfLessonPromises = [];
    let deleteLessons = false;
    for (const chapter of course.chapters) {
        if (chapter.lessonsRef?.length > 0){
            deleteLessons = true;
            break;
        }
    }
    if (deleteLessons){
        console.log("IN HERE");
        // var batch = firebase.firestore().batch()

        db.collection(`/Course/${course.id}/Lessons`).get()
            .then(queryResults => {
                // values.map(val => {
                //     batch.delete(val)
                // })


                console.log(queryResults);
                queryResults.forEach( doc => {
                    console.log(doc.data());
                    arrayOfLessonPromises.push(
                        db.collection(`/Course/${course.id}/Lessons/`).doc(doc.id).delete()
                    )
                })
            })
        
            return await Promise.all(arrayOfLessonPromises);
        }
}

// const deleteChapter = async (course, chapter) => {
//     db.collection(`/Course/${course.id}/`)
// }



export const deleteCourse = async (course) => {
    console.log(" ======= DELETE COURSE =============")
    console.log(course);
    console.log(course.id);
    console.log(course.owner);
    console.log(" ====== END DELETE");

    if (course.chapters?.length > 0 ){
        await deleteAllChapters(course)
    }
    return await deleteCourseInFirebase(course.id);
}


/*
* !!!!!!!!
* Course Attributes Section
* !!!!!!!!
*/
export const updateCourseOverview = async (course, content) => {
    const contentJSON = JSON.stringify(content);

    const updateObject = {
        overview: contentJSON
    }

    return await updateCourse(course.id, updateObject);
}

export const addNewChapter = async (course, newChapterInfo) => {
    const chapter = {}
    chapter.title = newChapterInfo.title;
    chapter.description = newChapterInfo.description;
    chapter.id = 0
    chapter.lessonsRef = [];

    if (course.chapters && course.chapters.length > 0) {
        chapter.id = course.chapters.length;
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

export const updateLesson = async (course, chapterInfo, lessonInfo, add) => {
    if (add) { // For initial lesson creation.
        delete lessonInfo.id; // cuz undefined is not allowed
        return await db.collection('Course').doc(course.id).collection('Lessons').add(lessonInfo)
            .then(async lessonDoc => {
                const lessonRef = db.doc(`Course/${course.id}/Lessons/${lessonDoc.id}`);
                const chapters = course.chapters.map(chapter => {
                    if (chapter === chapterInfo) {
                        chapter.lessonsRef.push(lessonRef);
                    }
                    return chapter
                });

                const updateObject = {
                    chapters
                }
                return await updateCourse(course.id, updateObject)
            });
    } else {
        const lessonRef = db.doc(`Course/${course.id}/Lessons/${lessonInfo.id}`);
        return await lessonRef.set(lessonInfo, { merge: true });
    }
}


/*
* -----------------------------------------------------------
*  Login Functions
* -----------------------------------------------------------
*/

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



/*
* -----------------------------------------------------------
*  Utility Functions
* -----------------------------------------------------------
*/

export const getDocFromDocRef = docRef => {
    return docRef.get()
        .then(result => {
            if (result.exists) {
                const myResult = result.data();
                myResult.id = result.id;
                return myResult;
            } else {
                return null;
            }
        })
}