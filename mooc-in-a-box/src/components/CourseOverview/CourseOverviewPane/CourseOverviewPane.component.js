import React from 'react';
import Paper from '@material-ui/core/Paper';
import CourseLesson from './CourseLesson/CourseLesson.component';
import { Button } from '@material-ui/core';


function CourseOverviewPane(props) {

    let openEditCourseOverviewDialogButton;
    if (props.editable){
        openEditCourseOverviewDialogButton =  <Button onClick={props.openEditCourseOverviewDialog} color="secondary" variant="contained"> Edit Overview </Button>
    }

    return (
        <Paper className="paper">
            {props.activeChapter ?
                <div>
                    <h2>Chapter: {props.activeChapter.title}</h2>
                    <CourseLesson lesson={props.activeLesson} />
                </div> :
                <div>
                    <p>course overview</p>
                    {openEditCourseOverviewDialogButton}
                </div>
            }
        </Paper>
    )
}

export default CourseOverviewPane;