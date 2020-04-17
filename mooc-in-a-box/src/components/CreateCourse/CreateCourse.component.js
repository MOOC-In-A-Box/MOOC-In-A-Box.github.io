import React, { useState } from 'react';
import './CreateCourse.css';
import { Button } from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from "react-router-dom";
import * as FirebaseService from '../../service/firebase.service';
import CreateCourseDialog from './CreateCourseDialog/CreateCourseDialog.component';
import CoursesDropdownComponent from '../CoursesDropdown/CoursesDropdown.component';
import { useHistory } from "react-router-dom";


function CreatedCoursesComponent(props) {

  return (
    <div className="courses-section">
      <h1> Courses You've Created </h1>
      <CoursesDropdownComponent courses={props.createdCourses} includeEditIcon={true}></CoursesDropdownComponent>
    </div>
  )
}

function CreateCourse(props) {
  const [isCreateCourseDialogOpen, setIsCreateCourseDialogOpen] = useState(false);
  const history = useHistory();

  props.routeClicked("Create Course");


  function handleCreateCourseDialogClose() {
    setIsCreateCourseDialogOpen(false);
  }

  function openCreateCourseDialog() {
    setIsCreateCourseDialogOpen(true);

  }

  async function handleSubmit(courseInfo) {
    courseInfo.owner = props.user.id;

    // const chapter = {
    //   id: 0,
    //   lessons: "Course/rlfxOavBn4nPZLNTRMkL/Lessons/kL5CwNARpoUhexocK7P4",
    //   sectionTitle: `${courseInfo.title} - Section`
    // }

    courseInfo.chapters = []
    // courseInfo.chapter = chapter;
    // courseInfo.chapters.push(chapter);

    const response = await FirebaseService.createCourse(props.user, courseInfo)
    setIsCreateCourseDialogOpen(false);
    await props.updateCourses();
    await props.updateUser(props.user.id);
    // Navigate to Edit Course page
    history.push(`/editCourse/${props.user.createdCoursesRefs[props.user.createdCoursesRefs.length - 1].id}`)
  }

  const hasCurrentCourses = false
  let currnetCoursesSection = null;
  if (props.user && props.user.createdCourses && props.user.createdCourses.length > 0) {
    currnetCoursesSection = <CreatedCoursesComponent createdCourses={props.user.createdCourses}></CreatedCoursesComponent>
  } else {
    currnetCoursesSection = <h3>You have not created any courses</h3>
  }


  return (
    <div className="Home">
      <CssBaseline />
      <Typography className="center" variant="h3" component="h3">
        Create A Course
        </Typography>
      <Container className="userProfile-bottom-padding" maxWidth="lg">
        <Paper className="paper">
          {
            currnetCoursesSection
          }
          <span>
            <Button variant="contained" color="secondary" onClick={openCreateCourseDialog}>
              Create New Course
              </Button>
          </span>
        </Paper>
      </Container>
      <Divider />

      <CreateCourseDialog
        isOpen={isCreateCourseDialogOpen}
        handleClose={handleCreateCourseDialogClose}
        handleSubmit={handleSubmit}
        user={props.user}
      />


    </div>
  );
}

export default CreateCourse;
