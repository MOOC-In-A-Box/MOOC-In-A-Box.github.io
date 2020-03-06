import React from 'react';
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

import Home from './components/Home/Home';


function App() {
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
            <CourseLibrary />
          </Route>
          <Route path="/courseOverview">
            <CourseOverview />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
