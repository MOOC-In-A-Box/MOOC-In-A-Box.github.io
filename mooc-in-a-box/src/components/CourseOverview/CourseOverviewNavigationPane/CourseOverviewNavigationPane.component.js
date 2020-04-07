import React, { useState, useEffect } from 'react';
import './CourseOverviewNavigationPane.css';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import CourseOverviewChapterPanel from './CourseOverviewChapterPanel/CourseOverviewChapterPanel.component'


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




function CourseOverviewNavigationPane(props) {

  const courseOverviewClicked = () => {
    props.setActiveLesson(undefined);
    props.setChapterInContext(undefined);
  }

  let courseNavigationPanels = [];
  
  const chaptersLength = props.course?.chapters?.length;

  if (chaptersLength > 0) {

    courseNavigationPanels = props.course.chapters.map(chapter =>
      <CourseOverviewChapterPanel setActiveLesson={props.setActiveLesson} activeLesson={props.activeLesson} setChapterInContext={props.setChapterInContext} chapter={chapter} />
    )

  }

  return (
    <Paper className="paper">
      <Button id="course-overview"
        onClick={courseOverviewClicked}>
        <h1>{props.course.title}</h1>
      </Button>
      {courseNavigationPanels}
    </Paper>
  )
}

export default CourseOverviewNavigationPane;