import React, { useEffect, useState } from 'react';
import {
  Link as RouterLink,
  useParams
} from "react-router-dom";

import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import EditCourseNavigationPane from './EditCourseNavigationPane/EditCourseNavigationPane.component';
import EditCoursePane from './EditCoursePane/EditCoursePane.component';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import CircularProgress from '@material-ui/core/CircularProgress';
import * as FirebaseService from '../../service/firebase.service';

function EditCourse(props) {
    // Get ID from Route Params
    let { id } = useParams();
    // Create State Variables
    const [course, setCourse] = useState();
    const [error, setError] = useState();


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

    if (course){
        return (
            <div className="edit-course">
              <Typography className="center" variant="h3" component="h3">
                  Edit Course
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={4}>
                      <EditCourseNavigationPane />
                  </Grid>
                  <Grid item xs={8}>
                       <EditCoursePane course={course} />
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

  export default EditCourse;