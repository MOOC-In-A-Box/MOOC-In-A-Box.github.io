import React from 'react';
import './CourseNavigationPane.css';
import Paper from '@material-ui/core/Paper';
import { IconButton, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


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

  const openDeleteDialog = (e) => {
    props.openDeleteDialog("Course", props.course);
  }

  let courseNavigationPanels = []
  const chaptersLength = props.course?.chapters?.length;

  if (chaptersLength > 0) {
    courseNavigationPanels = props.course.chapters.map(chapter =>
      <CourseChapterPanel editable={props.editable} setActiveLesson={props.setActiveLesson} activeLesson={props.activeLesson} openLessonModal={props.openLessonModal} chapterInContext={props.chapterInContext} setChapterInContext={setChapterInContext} chapter={chapter} />
    )
  }

  let addNewChapterButton;
  let deleteCourseButton;
  if (props.editable) {
    addNewChapterButton = <Button id="new-chapter" variant="contained" onClick={props.openCreateChapterDialog} color="secondary"> Add New Chapter </Button>
    deleteCourseButton = <IconButton id="delete-button" onClick={openDeleteDialog}> <DeleteForeverIcon /> </IconButton>
  }


  return (
    <Paper className="paper">
      <span>
        <Button id="course-overview" size="medium"
          onClick={courseOverviewClicked}>
          {props.course.title}
        </Button>
        {deleteCourseButton}
        <br />
      </span>
      {courseNavigationPanels}
      {addNewChapterButton}
    </Paper>
  )
}

export default CourseNavigationPane;