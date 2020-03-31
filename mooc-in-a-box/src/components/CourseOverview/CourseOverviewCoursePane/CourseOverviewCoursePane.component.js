import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';


function CourseOverviewCoursePane(props) {
    return (
        <Paper className="paper">{props.course.title}</Paper>
    )
}

export default CourseOverviewCoursePane;