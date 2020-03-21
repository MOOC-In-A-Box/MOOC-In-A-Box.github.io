import React from 'react';
import './MyCourses.css';
import {Button} from '@material-ui/core';
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
import {Link} from 'react-router-dom'


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


function CoursesDropdownComponent(props) {
  let numberOfCourses = props.courses.length;
  console.log(numberOfCourses);
  return (
    <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography variant="subtitle2">{numberOfCourses} Course(s)</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div>
                        <List dense="true">
                        {
                          props.courses.map( course => {
                            return (
                              <ListItem 
                                button
                                component={Link}
                                to={`/courseOverview/${course.courseId}`}
                              >
                                  <ListItemText
                                      primary={course.courseTitle}
                                  />
                              </ListItem>
                            )
                          })
                        }
                        </List>
                    </div>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
  )
}




function CurrentCoursesComponent(props){
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


function PastCoursesComponent(props){
  console.log(`Past Courses Component Props: ${props}`);
  return (
    <div>
      <h1> Past Courses </h1>
      <CoursesDropdownComponent courses={props.pastCourses}></CoursesDropdownComponent>
    </div>
  )
}

function SavedCoursesComponent(props){
  console.log(`Saved Courses Component Props: ${props}`);
  return (
    <div>
      <h1> Saved Courses </h1>
      <CoursesDropdownComponent courses={props.savedCourses}></CoursesDropdownComponent>
    </div>
  )
}

function CreatedCoursesComponent(props){
  console.log(`Created Courses Component Props: ${props}`);
  return (
    <div>
      <h1> Saved Courses </h1>
      <CoursesDropdownComponent courses={props.createdCourses}></CoursesDropdownComponent>
    </div>
  )
}



function MyCourses(props) {
  console.log("My Courses Component: ", props.user);
  if (props.user) {
    const courseComponentList = []
    console.log(props.user.favoritedCourses);

    
    if (props.user.currentCourses && props.user.currentCourses.length > 0){
      const element = <CurrentCoursesComponent currentCourses={props.user.currentCourses}></CurrentCoursesComponent>
      courseComponentList.push(element);
    }

    if (props.user.pastCourses && props.user.currentCourses.pastCourses > 0){
      const element = <PastCoursesComponent pastCourses={props.user.pastCourses}></PastCoursesComponent>
      courseComponentList.push(element);
    }

    if (props.user.favoritedCourses && props.user.favoritedCourses.length > 0){
      const element = <SavedCoursesComponent savedCourses={props.user.favoritedCourses}></SavedCoursesComponent>
      courseComponentList.push(element);
    }

    if (props.user.createdCourses && props.user.createdCourses.length > 0){
      const element = <CreatedCoursesComponent createdCourses={props.user.createdCourses}></CreatedCoursesComponent>
      courseComponentList.push(element);
    }

    return (
      <div className="MyCourses">
        <CssBaseline />
        <Typography className="center" variant="h3" component="h3">
            My Courses
        </Typography>
        <Container maxWidth="lg">
          <Paper className="paper">
            {
              courseComponentList.map( element => element)
            }
          </Paper>
        </Container>
      </div>
    );
  } else {
    return (
        <div>
            You don't have any course history!
        </div>
    )
  }

}

export default MyCourses;
