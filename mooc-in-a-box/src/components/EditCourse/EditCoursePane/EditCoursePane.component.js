import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';


function EditCoursePane(props) {
    return (
        <Paper className="paper">{props.course.title}</Paper>
    )
}

export default EditCoursePane;