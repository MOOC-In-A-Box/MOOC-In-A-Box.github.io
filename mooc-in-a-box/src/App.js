import React, { useState, useEffect } from 'react';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Button, } from '@material-ui/core';
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
    this.updateUser = this.updateUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getUserOnLoad = this.getUserOnLoad.bind(this);
    this.fetchCourses().then(() => {
      this.getUserOnLoad();
    });
  }

  async updateUser(userId) {
    if (!userId) {
      this.setState({ currentUser: undefined });
      return;
    }
    await FirebaseService.getUserById(userId)
      .then(result => {
        const user = result.data();

        if (user.createdCoursesRefs && user.createdCoursesRefs.length > 0) {
          console.log(user.createdCoursesRefs)
          const newCourses = user.createdCoursesRefs
            .map(courseRef => this.state.courses.find(course => course.id === courseRef.id));

          console.log(newCourses);
          console.log(this.state.courses);
          user.createdCourses = user.createdCoursesRefs
            .map(courseRef => this.state.courses.find(course => course.id === courseRef.id));
        }

        if (user.pastCoursesRefs && user.pastCoursesRefs.length > 0) {
          user.pastCourses = user.pastCoursesRefs
            .map(courseRef => this.state.courses.find(course => course.id === courseRef.id));
        }

        if (user.favoritedCoursesRefs && user.favoritedCoursesRefs.length > 0) {
          user.favoritedCourses = user.favoritedCoursesRefs
            .map(courseRef => this.state.courses.find(course => course.id === courseRef.id));
        }

        this.setState({ currentUser: user });

      })
  }

  getUserOnLoad() {
    let user = FirebaseService.getCurrentUser();
    if (user) {
      this.updateUser(user.uid);
    } else if (document.cookie.split(';').some((item) => item.trim().startsWith('userid='))) {
      var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      this.updateUser(cookieValue);
    } else {
      this.updateUser(undefined);
    }
    console.log('get current user')
    console.log(this.state.currentUser)
    // document.cookie = "userid=user.id";
  }

  setUser(user) {
    console.log("login", user);
    this.updateUser(user.id);
    document.cookie = `userid=${user.id}`;
  }

  async fetchCourses() {
    console.log('fetching courses')
    console.log(this.state.currentUser)
    let courses = [];
    await FirebaseService.getAllCourses().then((queryResults) => {
      queryResults.forEach((doc) => {
        const course = doc.data();
        console.log(course);
        const courseId = doc.id;
        course.owner.get().then(user => {
          course.owner = user.data();
        })
        course.chapter.lessons.get().then(lesson => {
          course.chapter.lessons = lesson.data();
        })
        course.id = courseId
        courses.push(course);
        this.setState({ courses: courses });
      });
    });
  }

  async fetchUsers() {
    let users = [];
    await FirebaseService.getAllUsers()
      .then((queryResults) => {
        queryResults.forEach((doc) => {
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

    if (this.state.currentUser) {
      console.log('logged in!')
    }

    return (
      <Router>
        <div>
          <nav hidden={!this.state.currentUser}>
            <AppBar position="static">
              <Toolbar>
                {/* <Button color="inherit" className="menu-button" component={RouterLink} to="/">MOOC-In-A-Box</Button> */}
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
              <Login completeLogin={this.setUser} />
            </Route>
            <Route path="/courseLibrary">
              <CourseLibrary courses={this.state.courses} user={this.state.currentUser} updateUser={this.updateUser}/>
            </Route>
            <Route path="/courseOverview/:id">
              <CourseOverview service={FirebaseService}></CourseOverview>
            </Route>
            <Route path="/myCourses">
              <MyCourses user={this.state.currentUser}></MyCourses>
            </Route>
            <Route path="/profile">
              <UserProfile user={this.state.currentUser} updateUser={this.updateUser}></UserProfile>
            </Route>
            <Route path="/createCourse">
              <CreateCourse user={this.state.currentUser} updateUser={this.updateUser} updateCourses={this.fetchCourses}></CreateCourse>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
};

export default App;
