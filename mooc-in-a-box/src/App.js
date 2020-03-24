import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar, Toolbar, IconButton, Typography, Button, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';




import CourseLibrary from './components/CourseLibrary/CourseLibrary';
import CourseOverview from './components/CourseOverview/CourseOverview';
import Login from './components/Login/Login';
import MyCourses from './components/MyCourses/MyCourses';
import UserProfile from './components/UserProfile/UserProfile';
import CreateCourse from './components/CreateCourse/CreateCourse.component';


import * as FirebaseService from '../src/service/firebase.service'
import { render } from '@testing-library/react';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      users: [],
      currentUser: undefined,
    };
    this.fetchCourses = this.fetchCourses.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.render = this.render.bind(this);
    this.fetchCourses();
    // this.fetchUsers();
  }

  setUser = (user) => {
    this.setState({currentUser: user})
  }

  useEffect() {
    // Update the document title using the browser API
    FirebaseService.getAllCourses().then( (queryResults) => {
        queryResults.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          console.log(doc.data());
        });
      })
    }
    
    async fetchCourses() {
      let courses = [];
      await FirebaseService.getAllCourses().then( (queryResults) => {
        queryResults.forEach((doc) => {
          const course = doc.data();
          const courseId = doc.id;
          course.owner.get().then(user => {
            course.owner = user.data();
          })
          course.chapter.lessons.get().then(lesson => {
            course.chapter.lessons = lesson.data();
          })
          course.id = courseId
          courses.push(course);
          this.setState({courses: courses});
        });
      });
    }

    async fetchUsers(){
      let users = [];
      await FirebaseService.getAllUsers()
        .then( (queryResults) => {
          queryResults.forEach( (doc) => {
            const user = doc.data();
            user.id = doc.id;
            users.push(user);
            this.setState({
              users
            })
          })
        })
    }


  render() {
    return (
      <Router>
        <div>
          <nav>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" className="menu-button" component={RouterLink} to="/">MOOC-In-A-Box</Button>
              <Button color="inherit" className="menu-button" component={RouterLink} to="/myCourses">My Courses</Button>
              <Button color="inherit" className="menu-button" component={RouterLink} to="/courseLibrary">All Courses</Button>
              <Button color="inherit" className="menu-button align-left" component={RouterLink} to="/createCourse">Create a Course</Button>
              <IconButton className="menu-button profile-icon" component={RouterLink} to="/profile" color="inherit" aria-label="menu">
                <AccountCircleIcon />
              </IconButton>
              <span>{this.props.user?.name}</span>
            </Toolbar>
          </AppBar>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Login completeLogin={this.setUser}/>
            </Route>
            <Route path="/courseLibrary">
              <CourseLibrary courses={this.state.courses}/>
            </Route>
            <Route path="/courseOverview/:id">
              <CourseOverview service={FirebaseService}></CourseOverview>
            </Route>
            <Route path="/myCourses">
              <MyCourses user={this.state.currentUser}></MyCourses>
            </Route>
            <Route path="/profile">
              <UserProfile user={this.state.currentUser}></UserProfile>
            </Route>
            <Route path="/createCourse">
              <CreateCourse user={this.state.currentUser}></CreateCourse>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
};

export default App;
