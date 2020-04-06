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
import CreateChapterDialog from './CreateChapterDialog/CreateChapterDialog.component';
import CreateLessonDialog from './CreateLessonDialog/CreateLessonDialog.component';

function EditCourse(props) {
    // Get ID from Route Params
    let { id } = useParams();
    // Create State Variables
    const [course, setCourse] = useState();
    const [error, setError] = useState();
    const [isCreateChapterDialogOpen, setIsCreateChapterDialogOpen] = useState(false);
    const [isCreateLessonDialogOpen, setIsCreateLessonDialogOpen] = useState(false);
    const [chapterInContext, setChapterInContext] = useState();
    const [activeLesson, setActiveLesson] = useState();


    function handleCreateChapterClose(){
        setIsCreateChapterDialogOpen(false);
    }

    function handleCreateLessonDialogClose(){
        setIsCreateLessonDialogOpen(false);
    }

    function openCreateChapterDialog(){
        setIsCreateChapterDialogOpen(true);
    }

    function openCreateLessonDialog(){
        setIsCreateLessonDialogOpen(true);
    }


    async function addNewLesson(lessonInfo){
        setIsCreateLessonDialogOpen(false);
        await FirebaseService.addNewLesson(course, chapterInContext, lessonInfo);
        getCourseById(id);

    }

    async function addNewChapter(chapterInfo){
        await FirebaseService.addNewChapter(course, chapterInfo);
        getCourseById(id);
    }


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
            <div className="edit-course">
              <Typography className="center" variant="h3" component="h3">
                  Edit Course
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={4}>
                      <EditCourseNavigationPane activeLesson={activeLesson} setActiveLesson={setActiveLesson} openLessonModal={openCreateLessonDialog} setChapterInContext={setChapterInContext} course={course} openCreateChapterDialog={openCreateChapterDialog} />
                  </Grid>
                  <Grid item xs={8}>
                       <EditCoursePane activeLesson={activeLesson} course={course} />
                  </Grid>
              </Grid>
              <CreateChapterDialog  isOpen={isCreateChapterDialogOpen}  handleSubmit={addNewChapter}    handleClose={handleCreateChapterClose} />
              <CreateLessonDialog   isOpen={isCreateLessonDialogOpen}   addNewLesson={addNewLesson}     handleClose={handleCreateLessonDialogClose} />

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