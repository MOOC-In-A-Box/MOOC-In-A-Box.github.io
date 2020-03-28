import React, { useState } from 'react';
import './MyCourses.css';
import {
  Link as RouterLink,
} from "react-router-dom";
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
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
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'

import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

import CoursesDropdownComponent from '../CoursesDropdown/CoursesDropdown.component';



/**
 * 
 * http://localhost:3000/courseOverview/rlfxOavBn4nPZLNTRMkL
 * http://localhost:3000/courseOverview/rlfxOavBn4nPZLNTRMkL
 */

/**
 * 
 * 
 */



function generate(element) {
  return React.cloneElement(element, {
    key: element,
  })
}

function CurrentCoursesComponent(props) {
  console.log(`Current Courses Component Props`, props);
  let numberOfCourses = props.currentCourses.length;
  console.log(numberOfCourses);
  return (
    <div>
      <h1> Current Courses </h1>
      <CoursesDropdownComponent courses={props.currentCourses}></CoursesDropdownComponent>
    </div>
  )
}


function PastCoursesComponent(props) {
  console.log(`Past Courses Component Props: ${props}`);
  return (
    <div>
      <h1> Past Courses </h1>
      <CoursesDropdownComponent courses={props.pastCourses}></CoursesDropdownComponent>
    </div>
  )
}

function SavedCoursesComponent(props) {
  console.log(`Saved Courses Component Props: ${props}`);
  return (
    <div>
      <h1> Saved Courses </h1>
      <CoursesDropdownComponent courses={props.savedCourses}></CoursesDropdownComponent>
    </div>
  )
}

function CreatedCoursesComponent(props) {
  console.log("Created Courses Component Props: ", props);
  return (
    <div>
      <h1> Saved Courses </h1>
      <CoursesDropdownComponent courses={props.createdCourses} includeEditIcon={true}></CoursesDropdownComponent>
    </div>
  )
}



function MyCourses(props) {
  console.log("My Courses Component: ", props);

  const [user, setUser] = useState();


  React.useEffect(() => {
    console.log("My Courses - Resetting State");
    setUser(props.user);
  }, [props]);


  if (user) {
    console.log("My Courses - My User ===", user);
    const courseComponentList = []
    console.log(user.favoritedCourses);
    let hasCourses = false;


    if (user.currentCourses && user.currentCourses.length > 0) {
      const element = <CurrentCoursesComponent currentCourses={user.currentCourses}></CurrentCoursesComponent>
      courseComponentList.push(element);
      hasCourses = true;
    }

    if (user.pastCourses && user.pastCourse.length > 0) {
      const element = <PastCoursesComponent pastCourses={user.pastCourses}></PastCoursesComponent>
      courseComponentList.push(element);
      hasCourses = true;

    }

    if (user.favoritedCourses && user.favoritedCourses.length > 0) {
      const element = <SavedCoursesComponent savedCourses={user.favoritedCourses}></SavedCoursesComponent>
      courseComponentList.push(element);
      hasCourses = true;

    }

    if (user.createdCourses && user.createdCourses.length > 0) {
      const element = <CreatedCoursesComponent createdCourses={user.createdCourses}></CreatedCoursesComponent>
      courseComponentList.push(element);
      hasCourses = true;

    }
    if (hasCourses) {
      return (
        <div className="MyCourses">
          <CssBaseline />
          <Typography className="center" variant="h3" component="h3">
            My Courses
          </Typography>
          <Container maxWidth="lg">
            <Paper className="paper">
              {
                courseComponentList.map(element => element)
              }
            </Paper>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="MyCourses">
          <CssBaseline />
          <Typography className="center" variant="h3" component="h3">
            My Courses
            </Typography>
          <Container maxWidth="lg">
            <Paper className="paper">
              <h4>You don't have any courses saved yet!</h4>
            </Paper>
          </Container>
        </div>
      )
    }


  } else {
    return (
      <div>
        Loading..
        <CircularProgress></CircularProgress>
      </div>
    )
  }

}

export default MyCourses;
