import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import CourseOverviewLesson from './CourseOverviewLesson/CourseOverviewLesson.component';


function CourseOverviewCoursePane(props) {
    return (
        <Paper className="paper">
            <h1>{props.course.title}</h1>
            { props.activeLesson ? 
                 <CourseOverviewLesson lesson={props.activeLesson} /> :
                <h3>No lesson selected</h3>
            }
        </Paper>
    )
}

export default CourseOverviewCoursePane;