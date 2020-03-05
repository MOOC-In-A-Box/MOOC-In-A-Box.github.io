import React from 'react';
import './CourseLibrary.css';
import {Button} from '@material-ui/core';
import CourseCard from '../CourseCard/CourseCard';

function CourseLibrary() {
  return (
    <div className="CurrentCourse">
      <CourseCard></CourseCard>
    </div>
  );
}

export default CourseLibrary;
