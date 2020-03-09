import React from 'react';
import './CourseLibrary.css';
import {Button} from '@material-ui/core';
import CourseCard from '../CourseCard/CourseCard';
import firebaseInstance from '../../config/firebase';
import { render } from '@testing-library/react';

class CourseLibrary extends React.Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    let listItems = this.props.courses.map(function(item) {
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
