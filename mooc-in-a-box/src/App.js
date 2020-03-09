import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar, Toolbar, IconButton, Typography, Button, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import CourseLibrary from './components/CourseLibrary/CourseLibrary';
import CourseOverview from './components/CourseOverview/CourseOverview';
import firebaseInstance from './config/firebase';
import Home from './components/Home/Home';
import { render } from '@testing-library/react';


class App extends React.Component {
  constructor() {
    super();
    this.state = {courses: []};
    this.fetchCourses = this.fetchCourses.bind(this);
    this.render = this.render.bind(this);
    this.fetchCourses();
  }

  useEffect() {
    // Update the document title using the browser API
    console.log("Helloooo world!");
    const db  = firebaseInstance.firestore();
    db.collection("Users").get().then( (queryResults) => {
        queryResults.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          console.log(doc.data());
        });
      })
    }
    
    async fetchCourses() {
      const db  = firebaseInstance.firestore();
      let courses = [];
      await db.collection("Course").get().then( (queryResults) => {
        queryResults.forEach((doc) => {
          const course = doc.data();
          course.owner.get().then(user => {
            course.owner = user.data();
          })
          course.chapter.lessons.get().then(lesson => {
            course.chapter.lessons = lesson.data();
          })
          courses.push(course);
          this.setState({courses: courses});
        });
      });
      console.log(courses)
    }

  render() {
    return (
      <Router>
        <div>
          <nav>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Button color="inherit" className="menu-button" component={RouterLink} to="/">MOOC-In-A-Box</Button>
              <Button color="inherit" className="menu-button" component={RouterLink} to="/courseOverview">Course Overview</Button>
              <Button color="inherit" className="menu-button" component={RouterLink} to="/courseLibrary">Course Library</Button>
            </Toolbar>
          </AppBar>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/courseLibrary">
              <CourseLibrary courses={this.state.courses}/>
            </Route>
            <Route path="/courseOverview">
              <CourseOverview />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
};

export default App;
