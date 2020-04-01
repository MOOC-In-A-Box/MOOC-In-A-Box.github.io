import React, { useState, useEffect } from 'react';
import './CourseOverview.css';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
import CircularProgress from '@material-ui/core/CircularProgress';
import * as FirebaseService from '../../service/firebase.service';
import { useParams } from "react-router-dom";

import CourseOverviewNavigationPane from './CourseOverviewNavigationPane/CourseOverviewNavigationPane.component';
import CourseOverviewCoursePane from './CourseOverviewCoursePane/CourseOverviewCoursePane.component';


function CourseOverview(props) {

    const [course, setCourse] = useState();
    const [error, setError] = useState();
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            console.log(`ID: ${id}`);
            FirebaseService.getCourseById(id)
                .then(courseResult => {
                    console.log(courseResult.exists)
                    if (courseResult.exists) {
                        setError(null);
                        setCourse(courseResult.data());
                    } else {
                        setError('Course Not Found');
                        setCourse();
                    }
                })
                .catch(() => setError('Course Get Fail'));
      }
    }, [id]);

    console.log("Course Overiew: ", course)
    if (course){
        return (
            <div className="courseOverview">
              <Typography className="center" variant="h3" component="h3">
                  Course Overview
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={4}>
                      <CourseOverviewNavigationPane course={course} />
                  </Grid>
                  <Grid item xs={8}>
                       <CourseOverviewCoursePane course={course} />
                  </Grid>
              </Grid>
            </div>
          );
    } else {
        return (
            <div>
                Loading...
                <CircularProgress></CircularProgress>
            </div>
        )
    }

  }
  
  export default CourseOverview;