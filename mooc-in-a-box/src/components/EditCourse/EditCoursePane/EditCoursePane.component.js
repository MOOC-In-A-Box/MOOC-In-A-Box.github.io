import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import EditCourseLesson from './EditCourseLesson/EditCourseLesson.component';


function EditCoursePane(props) {
    return (
        <Paper className="paper">
            <h1>{props.course.title}</h1>
            { props.activeLesson ? 
                <EditCourseLesson lesson={props.activeLesson} /> :
               <h3>No lesson selected</h3>
           }
        </Paper>
    )
}

export default EditCoursePane;