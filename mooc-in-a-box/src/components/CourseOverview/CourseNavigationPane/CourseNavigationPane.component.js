import React from 'react';
import './CourseNavigationPane.css';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

import CourseChapterPanel from './CourseChapterPanel/CourseChapterPanel.component';


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




function CourseNavigationPane(props) {

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
      <CourseChapterPanel editable={props.editable} setActiveLesson={props.setActiveLesson} activeLesson={props.activeLesson} openLessonModal={props.openLessonModal} chapterInContext={props.chapterInContext} setChapterInContext={setChapterInContext} chapter={chapter} />
    )
  }

  let addNewChapterButton;
  if (props.editable) {
    addNewChapterButton = <Button variant="contained" onClick={props.openCreateChapterDialog} color="secondary"> Add New Chapter </Button>
  }


  return (
    <Paper className="paper">
      <Button id="course-overview" size="medium"
        onClick={courseOverviewClicked}>
        {props.course.title}
        { 
          props.course.thumbnailUrl ?
            <img src={props.course.thumbnailUrl} height="100" width="100"></img>
          :
          ""
        }
      </Button>
      {courseNavigationPanels}
      {addNewChapterButton}
    </Paper>
  )
}

export default CourseNavigationPane;