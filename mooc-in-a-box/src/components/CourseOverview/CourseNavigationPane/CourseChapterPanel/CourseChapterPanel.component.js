import React, { useState, useEffect } from 'react';
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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import './CourseChapterPanel.css';

function CourseChapterPanel(props) {

    function listItemClicked(lesson) {
        props.setChapterInContext(props.chapter);
        props.setActiveLesson(lesson);
    }

    let lessonItems = []

    const lessonsLength = props.chapter?.lessons?.length;
    if (lessonsLength > 0) {
        lessonItems = props.chapter.lessons.map(lesson => {
            const isActiveLesson = (lesson === props.activeLesson);

            return (
                <ListItem selected={isActiveLesson} onClick={() => listItemClicked(lesson)} id={lesson.id} button>
                    <ListItemText primary={lesson.title} />
                </ListItem>
            )
        });
    } else {
        lessonItems[0] = <ListItem> <ListItemText primary="No Lessons Added" /> </ListItem>
    }


    function openLessonModal() {
        props.setChapterInContext(props.chapter);
        props.openLessonModal(/**addLesson=*/true);
    }

    let addNewLessonButton;

    if (props.editable) {
        addNewLessonButton = <Button variant="contained" onClick={openLessonModal} color="secondary" id="add-lesson">Add New Lesson</Button>
    }


    return (
        <ExpansionPanel
            defaultExpanded={props.chapter === props.chapterInContext}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="subtitle2">{props.chapter.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

                <List dense="true" className="lessons-list">
                    {lessonItems}
                    {addNewLessonButton}
                </List>

            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default CourseChapterPanel;