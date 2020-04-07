import React from 'react';


function EditCourseLesson(props) {
    return (
        <div>
            <h3>{props.lesson.title}</h3>
            <h6>Link: {props.lesson.video}</h6>
            <strong>Description: </strong>
            <p>{props.lesson.description}</p>
        </div>
    )
}

export default EditCourseLesson;