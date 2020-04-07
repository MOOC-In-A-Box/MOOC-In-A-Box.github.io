import React from 'react';
import './EditCourseNavigationPane.css';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

import EditCourseChapterPanel from './EditCourseChapterPanel/EditCourseChapterPanel.component';


/**
 * Generate multiple function
 */


function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}




function EditCourseNavigationPane(props) {

  function setChapterInContext(chapter) {
    props.setChapterInContext(chapter);
  }

  const courseOverviewClicked = () => {
    props.setActiveLesson(undefined);
    props.setChapterInContext(undefined);
  }

  let courseNavigationPanels = []
  const chaptersLength = props.course?.chapters?.length;
  if (chaptersLength > 0) {
    courseNavigationPanels = props.course.chapters.map(chapter =>
      <EditCourseChapterPanel setActiveLesson={props.setActiveLesson} activeLesson={props.activeLesson} openLessonModal={props.openLessonModal} setChapterInContext={setChapterInContext} chapter={chapter} />
    )
  }

  return (
    <Paper className="paper">
      <Button id="course-overview"
        onClick={courseOverviewClicked}>
        <h1>{props.course.title}</h1>
      </Button>
      {courseNavigationPanels}
      <Button variant="contained" onClick={props.openCreateChapterDialog} color="secondary">
        Add New Chapter
      </Button>

    </Paper>
  )
}

export default EditCourseNavigationPane;