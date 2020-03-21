import React from 'react';
import './CourseLibrary.css';
import {Button} from '@material-ui/core';
import CourseCard from '../CourseCard/CourseCard';
import { render } from '@testing-library/react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';







import {AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';


import * as FirebaseService from '../../service/firebase.service'


function SearchBarComponent(props) {
  console.log(props);
  return(
    <div className="search-bar">
        <TextField value={props.searchValue} onChange={props.onChange} id="outlined-search" type="search" variant="outlined"  color="white"/>
        <IconButton className="menu-button" onClick={props.onSearchClicked}>
          <SearchIcon className="search-bar-icon" />
        </IconButton>
    </div>
  )
}


class CourseLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClicked = this.handleSearchClicked.bind(this);
    this.state = {
      searchValue: ""
    }
  }

  handleSearchChange(e){
    console.log("Key Entered!")
    this.setState({
      searchValue: e.target.value
    })
  }

  handleSearchClicked(e){
    console.log("Search button clicked!")
    console.log(this.state.searchValue);
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
    
    return (
      <div class="course-library">
        <AppBar position="static" className="course-library-app-bar">
            <Toolbar>
              <Button color="inherit" className="menu-button">Sort By</Button>
              <Button color="inherit" className="menu-button">Topic</Button>
              <Button color="inherit" className="menu-button">Organization</Button>
              <Button color="inherit" className="menu-button">My Courses</Button>
              <SearchBarComponent searchValue={this.state.searchValue} onChange={this.handleSearchChange} onSearchClicked={this.handleSearchClicked}></SearchBarComponent>
              </Toolbar>
          </AppBar>
          <div className="course-list">
            {listItems}
          </div>
      </div>

      );
  }
}

export default CourseLibrary;
