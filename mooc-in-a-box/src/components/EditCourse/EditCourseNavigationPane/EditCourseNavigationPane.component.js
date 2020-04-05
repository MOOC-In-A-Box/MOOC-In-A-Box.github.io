import React, { useState, useEffect } from 'react';
import './EditCourseNavigationPane.css';

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
import {Button} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';

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

  function setChapterInContext(chapter){
    props.setChapterInContext(chapter);
  }


    let courseNavigationPanels = []
    if (props.course && props.course.chapters && props.course.chapters.length > 0){
        courseNavigationPanels = props.course.chapters.map( chapter => 
          <EditCourseChapterPanel openLessonModal={props.openLessonModal} setChapterInContext={setChapterInContext} chapter={chapter} />
        )
      }

    return (
        <Paper className="paper">

            {courseNavigationPanels}
            <Button variant="contained" onClick={props.openCreateChapterDialog} color="secondary">
                Add New Chapter
            </Button>

    </Paper>
    )
}

export default EditCourseNavigationPane;