import React from 'react';
import Paper from '@material-ui/core/Paper';
import EditCourseLesson from './EditCourseLesson/EditCourseLesson.component';
import { Button } from '@material-ui/core';


function EditCoursePane(props) {
    return (
        <Paper className="paper">
            {props.activeChapter ?
                <div>
                    <h2>Chapter: {props.activeChapter.title}</h2>
                    <EditCourseLesson lesson={props.activeLesson} />
                </div> :
                <div>
                    <p>course overview</p>
                    <Button onClick={props.openEditCourseOverviewDialog} color="secondary" variant="contained">
                        Edit Overview
                    </Button>
                </div>
            }
        </Paper>
    )
}

export default EditCoursePane;