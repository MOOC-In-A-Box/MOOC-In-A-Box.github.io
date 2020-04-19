import React, { useEffect, useState } from 'react';
import './CourseOverview.css';
import {
    Link as RouterLink,
    useParams,
    useHistory
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
import CreateCourseDialog from '../CreateCourse/CreateCourseDialog/CreateCourseDialog.component';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteDialog from './Dialogs/DeleteDialog/DeleteDialog.component';




function CourseOverview(props) {
    // Get ID from Route Params
    let { id } = useParams();
    // Create State Variables
    const [course, setCourse] = useState();
    const [error, setError] = useState();
    const [isCreateChapterDialogOpen, setIsCreateChapterDialogOpen] = useState(false);
    const [isCreateLessonDialogOpen, setIsCreateLessonDialogOpen] = useState(false);
    const [isEditCourseOverviewDialogOpen, setIsEditCourseOverviewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [chapterInContext, setChapterInContext] = useState();
    const [activeLesson, setActiveLesson] = useState();
    const [addLesson, setAddLesson] = useState();
    const [deleteType, setDeleteType] = useState();
    const [objToDelete, setObjToDelete] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const history = useHistory();


    props.routeClicked("Course Overview");



    function handleCreateChapterClose() {
        setIsCreateChapterDialogOpen(false);
    }

    function openCreateChapterDialog() {
        setIsCreateChapterDialogOpen(true);
    }

    function handleCreateLessonDialogClose() {
        setIsCreateLessonDialogOpen(false);
    }

    function openCreateLessonDialog(addLesson) {
        setAddLesson(addLesson);
        setIsCreateLessonDialogOpen(true);
    }

    function handleEditCourseOverviewDialogClose() {
        setIsEditCourseOverviewDialogOpen(false);
    }

    function openEditCourseOverviewDialog() {
        setIsEditCourseOverviewDialogOpen(true);
    }

    function viewPublished() {
        props.history.push(`/courseOverview/${course.id}`);
    }

    function openDeleteDialog(deleteType, objToDelete){
        setIsDeleteDialogOpen(true);
        setDeleteType(deleteType);
        setObjToDelete(objToDelete)
    }

    function handleCloseDeleteDialog(){
        setIsDeleteDialogOpen(false);
    }

    async function handleDeleteSubmit(){

        props.setDeletingCourse(true)

        if (deleteType === 'Course') {
            await FirebaseService.deleteCourse(objToDelete);
            await props.updateCourses()
            await props.updateUser(props.user.id);
            history.push('/courseLibrary');

        } else if (deleteType === 'Lesson'){

            await FirebaseService.deleteLesson(course, chapterInContext, objToDelete);
            setActiveLesson();
            setChapterInContext();
            await props.updateCourses();
            await props.updateUser(props.user.id);
        }

        props.setDeletingCourse(false);

    }

    async function updateLesson(lessonInfo, add) {
       
        await FirebaseService.updateLesson(course, chapterInContext, lessonInfo, add).then(() => {
            getCourseById(id);
            setAddLesson(add);
            setIsCreateLessonDialogOpen(false);
            // setChapterInContext()
        }).catch((err) => { console.log(err) });
    }

    async function updateCourse(courseInfo) {
        setIsEditCourseOverviewDialogOpen(false);
        await FirebaseService.updateCourse(course.id, courseInfo);
        props.updateCourses();
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
            const course = await FirebaseService.getCourseById(id);
            course.chapters = await resolveChapters(course.chapters);
            const chapter = course.chapters.find( chapter => chapter.title === chapterInContext );
            setChapterInContext(chapter);
            setCourse(course);

    }

    useEffect(() => {
        if (id && !props.isDeletingCourse) {
            getCourseById(id);
        }
    }, []);

    useEffect(() => {
        // after adding/editing a lesson, ensure we navigate to the freshest version
        if (course && chapterInContext) {
            if (!addLesson) {
                const updatedLesson = course.chapters[chapterInContext.id].lessons.find(lesson => {
                    if (lesson.id === activeLesson.id) {
                        return lesson;
                    }
                });
                if (updatedLesson) {

                    setActiveLesson(updatedLesson);
                }
            } else {
                const lessons = course.chapters[chapterInContext.id].lessons;
                setActiveLesson(lessons[lessons.length - 1]);
            }
        }
    }, [course]);

    let dialogs;
    let viewPublishedCourseButton;
    if (props.editable) {
        dialogs = <div>
            <CreateChapterDialog isOpen={isCreateChapterDialogOpen} handleSubmit={addNewChapter} handleClose={handleCreateChapterClose} />
            <CreateLessonDialog 
                isOpen={isCreateLessonDialogOpen} 
                add={addLesson} 
                lesson={activeLesson} 
                updateLesson={updateLesson} 
                handleClose={handleCreateLessonDialogClose} />

            <CreateCourseDialog
                isOpen={isEditCourseOverviewDialogOpen}
                handleClose={handleEditCourseOverviewDialogClose}
                course={course}
                handleSubmit={updateCourse}
            />
            <DeleteDialog
                isOpen={isDeleteDialogOpen}
                handleClose={handleCloseDeleteDialog}
                handleSubmit={handleDeleteSubmit}
                deleteType={deleteType}
                objToDelete={objToDelete}
            />
        </div>

        viewPublishedCourseButton = <Button variant="contained" color="secondary" onClick={viewPublished}> View Published Course </Button>
    }



    if (course) {
        return (
            <div className="edit-course">
                <Grid container spacing={6}>
                    <Grid item xs={3}>
                        <CourseNavigationPane 
                            editable={props.editable} 
                            activeLesson={activeLesson} 
                            setActiveLesson={setActiveLesson} 
                            openLessonModal={openCreateLessonDialog} 
                            chapterInContext={chapterInContext} 
                            setChapterInContext={setChapterInContext} 
                            course={course} 
                            openCreateChapterDialog={openCreateChapterDialog}
                            openDeleteDialog={openDeleteDialog}
                            />
                    </Grid>
                    <Grid item xs={9}>
                        <CourseOverviewPane 
                        setActiveLesson={setActiveLesson} 
                        setChapterInContext={setChapterInContext} 
                        editable={props.editable} 
                        activeChapter={chapterInContext} 
                        activeLesson={activeLesson} 
                        course={course} 
                        openEditCourseOverviewDialog={openEditCourseOverviewDialog} 
                        openLessonModal={openCreateLessonDialog} 
                        openDeleteDialog={openDeleteDialog}
                        />
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