import React from 'react';
import Paper from '@material-ui/core/Paper';
import EditCourseLesson from './EditCourseLesson/EditCourseLesson.component';


function EditCoursePane(props) {
    return (
        <Paper className="paper">
            <h1>{props.course.title}</h1>
            {
                props.activeChapter ?
                <h2>Chapter: {props.activeChapter.title}</h2> :
                <h2>No Chapter Selected </h2>

            }
            { props.activeLesson ? 
                <EditCourseLesson lesson={props.activeLesson} /> :
               <h3>No lesson selected</h3>
           }
        </Paper>
    )
}

export default EditCoursePane;