import React from 'react';
import './CourseLibrary.css';
import {Button} from '@material-ui/core';
import CourseCard from '../CourseCard/CourseCard';
import { render } from '@testing-library/react';

import * as FirebaseService from '../../service/firebase.service'

class CourseLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.getCourses();
  }
  
  async getCourses() {
    this.courses = [];
    await FirebaseService.getAllCourses().then( (queryResults) => {
      queryResults.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(doc.data());
        const course = doc.data();
        const courseId = doc.id;
        course.owner.get().then(user => {
          course.owner = user.data();
          // console.log(user.data())
        })
        course.chapter.lessons.get().then(lesson => {
          course.chapter.lessons = lesson.data();
          // console.log(lesson.data())
        })
        // console.log(course);
        course.id = courseId;
        this.courses.push(course);
        this.setState({data: this.courses});
      });
    });
    console.log(this.courses)
  }

  render() {
    let listItems = this.courses.map(function(item) {
      return (
        <div className="CurrentCourse">
          <CourseCard course={item}
          ></CourseCard>
        </div>
      );
    });
    
    return (listItems);
  }
}

export default CourseLibrary;
