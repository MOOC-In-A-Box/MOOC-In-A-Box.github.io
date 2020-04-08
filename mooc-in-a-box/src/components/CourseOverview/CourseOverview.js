import React, { useState, useEffect } from 'react';
import './CourseOverview.css';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from "react-router-dom";

import * as FirebaseService from '../../service/firebase.service';
import EditCourseNavigationPane from '../EditCourse/EditCourseNavigationPane/EditCourseNavigationPane.component';
import EditCoursePane from '../EditCourse/EditCoursePane/EditCoursePane.component';

function CourseOverview(props) {

    const [course, setCourse] = useState();
    const [activeLesson, setActiveLesson] = useState();
    const [chapterInContext, setChapterInContext] = useState();

    let { id } = useParams();


    async function resolveLessons(chapter) {

        const lessonsArrayLength = chapter.lessonRef?.length;
        if (lessonsArrayLength > 0) {
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
        if (course.chapters) {
            course.chapters = await resolveChapters(course.chapters);
        }
        setCourse(course);
    }

    useEffect(() => {
        if (id) {
            getCourseById(id);
        }
    }, [id]);

    if (course) {
        return (
            <div className="courseOverview">
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <EditCourseNavigationPane editable={false} activeLesson={activeLesson} setActiveLesson={setActiveLesson} setChapterInContext={setChapterInContext} course={course} />
                    </Grid>
                    <Grid item xs={8}>
                        <EditCoursePane editable={false} activeChapter={chapterInContext} activeLesson={activeLesson} course={course} />
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