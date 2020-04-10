import React, { useEffect, useState } from 'react';
import './CourseOverview.css';
import {
    Link as RouterLink,
    useParams
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import * as FirebaseService from '../../service/firebase.service';
import CourseNavigationPane from './CourseNavigationPane/CourseNavigationPane.component';

import CourseOverviewPane from './CourseOverviewPane/CourseOverviewPane.component';
import CreateChapterDialog from './Dialogs/CreateChapterDialog/CreateChapterDialog.component';
import CreateLessonDialog from './Dialogs/CreateLessonDialog/CreateLessonDialog.component';
import EditCourseOverviewDialog from './Dialogs/EditCourseOverviewDialog/EditCourseOverviewDialog.component';

function CourseOverview(props) {
    // Get ID from Route Params
    let { id } = useParams();
    // Create State Variables
    const [course, setCourse] = useState();
    const [error, setError] = useState();
    const [isCreateChapterDialogOpen, setIsCreateChapterDialogOpen] = useState(false);
    const [isCreateLessonDialogOpen, setIsCreateLessonDialogOpen] = useState(false);
    const [isEditCourseOverviewDialogOpen, setIsEditCourseOverviewDialogOpen] = useState(false);
    const [chapterInContext, setChapterInContext] = useState();
    const [activeLesson, setActiveLesson] = useState();


    function handleCreateChapterClose() {
        setIsCreateChapterDialogOpen(false);
    }

    function openCreateChapterDialog() {
        setIsCreateChapterDialogOpen(true);
    }

    function handleCreateLessonDialogClose() {
        setIsCreateLessonDialogOpen(false);
    }

    function openCreateLessonDialog() {
        setIsCreateLessonDialogOpen(true);
    }

    function handleEditCourseOverviewDialogClose() {
        setIsEditCourseOverviewDialogOpen(false);
    }

    function openEditCourseOverviewDialog() {
        setIsEditCourseOverviewDialogOpen(true);
    }

    function viewPublished() {
        // ensure course overview
        setActiveLesson(undefined);
        setChapterInContext(undefined);
        // navigate
        props.history.push(`/courseOverview/${course.id}`);
    }


    async function addNewLesson(lessonInfo) {
        setIsCreateLessonDialogOpen(false);
        await FirebaseService.addNewLesson(course, chapterInContext, lessonInfo);
        getCourseById(id);
    }

    async function updateCourseOverview(overview) {
        setIsEditCourseOverviewDialogOpen(false);
        console.log(overview)
        await FirebaseService.updateCourseOverview(course, overview);
        getCourseById(id);
    }

    async function addNewChapter(chapterInfo) {
        await FirebaseService.addNewChapter(course, chapterInfo);
        getCourseById(id);
        setIsCreateChapterDialogOpen(false);
    }


    async function resolveLessons(chapter) {
        const lessonsRefLength = chapter.lessonsRef?.length;
        if (lessonsRefLength > 0) {
            return Promise.all(
                chapter.lessonsRef.map(async lessonRef => {
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

    async function resolveChapters(chapters) {
        return Promise.all(chapters.map(chapter => resolveLessons(chapter)))
    }

    async function getCourseById(id) {
        const course = await FirebaseService.getCourseByIdEvaluatePromise(id);
        course.chapters = await resolveChapters(course.chapters);
        setCourse(course);
        console.log(course)
    }

    useEffect(() => {
        if (id) {
            getCourseById(id);
        }
    }, [id]);

    let dialogs;
    let viewPublishedCourseButton;
    if (props.editable) {
        dialogs = <div>
            <CreateChapterDialog isOpen={isCreateChapterDialogOpen} handleSubmit={addNewChapter} handleClose={handleCreateChapterClose} />
            <CreateLessonDialog isOpen={isCreateLessonDialogOpen} addNewLesson={addNewLesson} handleClose={handleCreateLessonDialogClose} />
            <EditCourseOverviewDialog isOpen={isEditCourseOverviewDialogOpen} updateCourseOverview={updateCourseOverview} handleClose={handleEditCourseOverviewDialogClose} course={course} />
        </div>

        viewPublishedCourseButton = <Button variant="contained" color="secondary" onClick={viewPublished}> View Published Course </Button>
    }



    if (course) {
        return (
            <div className="edit-course">
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <CourseNavigationPane editable={props.editable} activeLesson={activeLesson} setActiveLesson={setActiveLesson} openLessonModal={openCreateLessonDialog} chapterInContext={chapterInContext} setChapterInContext={setChapterInContext} course={course} openCreateChapterDialog={openCreateChapterDialog} />
                    </Grid>
                    <Grid item xs={8}>
                        <CourseOverviewPane setActiveLesson={setActiveLesson} setChapterInContext={setChapterInContext} editable={props.editable} activeChapter={chapterInContext} activeLesson={activeLesson} course={course} openEditCourseOverviewDialog={openEditCourseOverviewDialog} />
                    </Grid>
                    {viewPublishedCourseButton}
                </Grid>
                {dialogs}
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

export default withRouter(CourseOverview);