import React from 'react';


function CourseOverviewLesson(props) {
    return (
        <div>
            {
                props.lesson ?
                    <div>
                        <h3>{props.lesson.title}</h3>
                        <h6>Link: {props.lesson.video}</h6>
                        <strong>Description: </strong>
                        <p>{props.lesson.description}</p>
                    </div> :
                    <h3>No lesson selected</h3>
            }
        </div>
    )
}

export default CourseOverviewLesson;