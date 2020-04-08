import React from 'react';


function EditCourseLesson(props) {
    if(props.lesson){
        return (
            <div>
                <h3>{props.lesson.title}</h3>
                <h6>Link: {props.lesson.video}</h6>
                <strong>Description: </strong>
                <p>{props.lesson.description}</p>
            </div>
        )
    } else {
        return (
            <div>
                <h5> No Lesson Details </h5>
            </div>
        )
    }
    
}

export default EditCourseLesson;