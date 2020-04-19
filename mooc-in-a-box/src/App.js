import React, { useState, useEffect } from 'react';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Button, } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
  Redirect,
  withRouter,
  browserHistory
} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CourseLibrary from './components/CourseLibrary/CourseLibrary';
import Login from './components/Login/Login';
import MyCourses from './components/MyCourses/MyCourses';
import UserProfile from './components/UserProfile/UserProfile';
import CreateCourse from './components/CreateCourse/CreateCourse.component';
import CourseOverview from './components/CourseOverview/CourseOverview.component';
import { MuiThemeProvider, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as FirebaseService from '../src/service/firebase.service'

const buttonTheme = createMuiTheme({
  palette: {
    primary: { // peaches
      main: '#87618c',
    },
    secondary: {  // purples
      main: '#442b4a',
    },
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: { // peaches
      light: '#f44336',
      main: '#f6eee7',
      dark: '#dbbca1',
    },
    secondary: {  // purples
      light: '#a17da5',
      main: '#87618c',
      dark: '#442b4a',
    },
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
})

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      users: [],
      currentUser: undefined,
      loadingUser: true,
      myCourseSelected: false,
      allCoursesSelected: false,
      isDeletingCourse: false
    };
    this.fetchCourses = this.fetchCourses.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.render = this.render.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getUserOnLoad = this.getUserOnLoad.bind(this);
    this.routeClicked = this.routeClicked.bind(this);
    this.deletingCourse = this.deletingCourse.bind(this);
    this.fetchCourses().then(() => {
      this.getUserOnLoad();
    });
  }

  async updateUser(userId){
    if (!userId) {
      this.setState({ currentUser: undefined });
      this.setState({ loadingUser: false });
      return;
    }
    await FirebaseService.getUserById(userId)
      .then(result => {
        const user = result.data();

        if (user.createdCoursesRefs && user.createdCoursesRefs.length > 0) {

          const newCourses = user.createdCoursesRefs
            .map(courseRef => this.state.courses.find(course => course.id === courseRef.id));

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
        this.setState({ loadingUser: false });

      })
  }

  deletingCourse(value){
    this.setState({
        isDeletingCourse: value
      }
    )
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
  }

  setUser(user) {
    this.updateUser(user.id);
    document.cookie = `userid=${user.id}`;
  }

  async fetchCourses() {
    let courses = [];
    await FirebaseService.getAllCourses().then((queryResults) => {
      queryResults.forEach((doc) => {
        const course = doc.data();
        const courseId = doc.id;
        course.owner.get().then(user => {
          course.owner = user.data();
        })
        // course.chapter.lessons.get().then(lesson => {
        //   course.chapter.lessons = lesson.data();
        // })
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

  routeClicked(location){
    console.log("New Location: ", location);
    if (location === "Course Library" && !this.state.allCoursesSelected){
      this.setState({
        allCoursesSelected: true,
        myCourseSelected: false
      })
    } else if (location === "My Courses" && !this.state.myCourseSelected){
      this.setState({
        allCoursesSelected: false,
        myCourseSelected: true
      })
    } else if ( (location !== "Course Library" && location !== "My Courses") && (this.state.allCoursesSelected || this.state.myCourseSelected)){
      this.setState({
        allCoursesSelected: false,
        myCourseSelected: false
      })
    }
  }

  render() {

    // If not logged in redirect to the login page with redirect info. Url will
    // briefly flash to login while we figure out if we have a user.
    const PrivateRoute = ({ isLoggedIn, ...props }) =>
      this.state.currentUser
        ? <Route {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />

    return (
      <MuiThemeProvider theme={theme}>
        <Router onChange={this.browserRouteChanged}>
          <div>
            <nav hidden={!this.state.currentUser}>
              <AppBar position="static">
                <Toolbar>
                  <MuiThemeProvider theme={buttonTheme}>
                    <Button variant="contained" color={ this.state.allCoursesSelected ? "secondary" : "primary"} className="menu-button main" component={RouterLink} to="/courseLibrary">All Courses</Button>
                    <Button variant="contained" color={ this.state.myCourseSelected ? "secondary" : "primary"} className="menu-button main" component={RouterLink} to="/myCourses">My Courses</Button>
                  </MuiThemeProvider>
                    <Button variant="outlined" color="secondary" className="menu-button align-left" component={RouterLink} to="/createCourse">Create a Course</Button>
                  <IconButton className="menu-button profile-icon" component={RouterLink} to="/profile" color="inherit" aria-label="menu">
                    <AccountCircleIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/login">
                <Login routeClicked={this.routeClicked} completeLogin={this.setUser} user={this.state.currentUser} loadingUser={this.state.loadingUser} />
              </Route>
              <PrivateRoute path="/(courseLibrary|)">
                <CourseLibrary routeClicked={this.routeClicked} courses={this.state.courses} user={this.state.currentUser} updateUser={this.updateUser} />
              </PrivateRoute>
              <PrivateRoute path="/courseOverview/:id">
                <CourseOverview routeClicked={this.routeClicked}  editable={false} user={this.state.currentUser}></CourseOverview>
              </PrivateRoute>
              <PrivateRoute path="/myCourses">
                <MyCourses routeClicked={this.routeClicked} user={this.state.currentUser}></MyCourses>
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <UserProfile routeClicked={this.routeClicked} user={this.state.currentUser} updateUser={this.updateUser}></UserProfile>
              </PrivateRoute>
              <PrivateRoute path="/createCourse">
                <CreateCourse routeClicked={this.routeClicked} user={this.state.currentUser} updateUser={this.updateUser} updateCourses={this.fetchCourses}></CreateCourse>
              </PrivateRoute>
              <PrivateRoute path="/editCourse/:id">
                <CourseOverview  setDeletingCourse={this.deletingCourse} isDeletingCourse={this.state.isDeletingCourse} routeClicked={this.routeClicked} editable={true}  user={this.state.currentUser} updateUser={this.updateUser}  updateCourses={this.fetchCourses}></CourseOverview>
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
};


export default App;
