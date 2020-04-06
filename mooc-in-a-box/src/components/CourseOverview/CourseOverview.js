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
    const [activeLesson, setActiveLesson] = useState();
    const [error, setError] = useState();
    let { id } = useParams();


    async function resolveLessons(chapter){
        if (chapter.lessonsRef && chapter.lessonsRef.length > 0){
            return Promise.all(
                chapter.lessonsRef.map( async lessonRef => {
                    const lesson = await FirebaseService.getDocFromDocRef(lessonRef)
                    return lesson;
                })
                ).then(results => {
                    chapter.lessons = results;
                    return chapter;
                });
                
        } else {
          return Promise.resolve(chapter);  
        }
    }

    async function resolveChapters(chapters){
        return Promise.all(chapters.map( chapter => resolveLessons(chapter)))
    }

    async function getCourseById(id){
        const course = await FirebaseService.getCourseByIdEvaluatePromise(id);
        course.chapters = await resolveChapters(course.chapters);
        setCourse(course);
    }

    useEffect(() => {
        if (id) {
            getCourseById(id); 
      }
    }, [id]);

    if (course){
        return (
            <div className="courseOverview">
              <Typography className="center" variant="h3" component="h3">
                  Course Overview
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={4}>
                      <CourseOverviewNavigationPane activeLesson={activeLesson} setActiveLesson={setActiveLesson} course={course} />
                  </Grid>
                  <Grid item xs={8}>
                       <CourseOverviewCoursePane activeLesson={activeLesson} course={course} />
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