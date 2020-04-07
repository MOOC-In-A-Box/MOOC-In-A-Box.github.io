import React from 'react';
import Paper from '@material-ui/core/Paper';
import CourseOverviewLesson from './CourseOverviewLesson/CourseOverviewLesson.component';


function CourseOverviewCoursePane(props) {
    return (
        <Paper className="paper">
            {props.activeChapter ?
                <div>
                    <h2>Chapter: {props.activeChapter.title}</h2>
                    <CourseOverviewLesson lesson={props.activeLesson} />
                </div> :
                <p>course overview</p>
            }
        </Paper>
    )
}

export default CourseOverviewCoursePane;