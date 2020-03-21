import React from 'react';
import './CourseLibrary.css';
import {Button} from '@material-ui/core';
import CourseCard from '../CourseCard/CourseCard';
import { render } from '@testing-library/react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SearchBar from './CourseLibraryToolbar/SearchBar/SearchBar.component';
import CourseLibraryMenu from './CourseLibraryToolbar/CourseLibraryToolbarMenu/CourseLibraryToolbarMenu.component'

import CourseLibraryToolbar from './CourseLibraryToolbar/CourseLibraryToolbar.component'

class CourseLibrary extends React.Component {
  constructor(props) {
    super(props);
    // Bind Search
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClicked = this.handleSearchClicked.bind(this);
    // Bind Sort By
    this.sortByClicked = this.sortByClicked.bind(this);
    this.sortByHandleClose = this.sortByHandleClose.bind(this);
    // Bind Topic
    this.topicClicked = this.topicClicked.bind(this);
    this.topicHandleClose = this.topicHandleClose.bind(this);
    // Bind Organization
    this.organizationClicked = this.organizationClicked.bind(this);
    this.organizationHandleClosed = this.organizationHandleClosed.bind(this);

    this.buildMenuItems = this.buildMenuItems.bind(this);

    this.state = {
      searchValue: "",
      sortByElement: null,
      topicElement: null,
      organizationElement: null,
    }
  }

  /** Search Function */
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

  /** Sort By Functions */
  sortByClicked = event => {
    this.setState({
      sortByElement: event.currentTarget
    });
  };

  sortByHandleClose = () => {
    this.setState({
      sortByElement: null
    });
  };


  /** Topic Functions */
  topicClicked = event => {
    this.setState({
      topicElement: event.currentTarget
    });
  };

  topicHandleClose = () => {
    this.setState({
      topicElement: null
    });
  };


  /** Organization functions */
  organizationClicked = event => {
    this.setState({
      organizationElement: event.currentTarget
    });
  };

  organizationHandleClosed = () => {
    this.setState({
      organizationElement: null
    });
  };

  buildMenuItems = () => {
    const sortByInfo = {
      buttonText: "Sort By",
      menuId: "menu-sort-by",
      clickedFunction: this.sortByClicked,
      closeFunction: this.sortByHandleClose,
      element: this.state.sortByElement,
      menuOptions: [
        {
          display: "Newest",
          associatedClickFunction:  this.sortByHandleClose
        },
        {
          display: "Recommended",
          associatedClickFunction:  this.sortByHandleClose
        },
        {
          display: "Trending",
          associatedClickFunction:  this.sortByHandleClose
        }
      ]
    }

    const topicInfo = {
      buttonText: "Topic",
      menuId: "menu-topic",
      clickedFunction: this.topicClicked,
      element: this.state.topicElement,
      closeFunction: this.topicHandleClose,
      menuOptions: [
        {
          display: "Science",
          associatedClickFunction:  this.topicHandleClose
        },
        {
          display: "Technology",
          associatedClickFunction:  this.topicHandleClose
        },
        {
          display: "History",
          associatedClickFunction:  this.topicHandleClose
        },
        {
          display: "Arts",
          associatedClickFunction:  this.topicHandleClose
        }
      ]
    }

    const organizationInfo = {
      buttonText: "Organization",
      menuId: "menu-organization",
      clickedFunction: this.organizationClicked,
      element: this.state.organizationElement,
      closeFunction: this.organizationHandleClosed,
      menuOptions: [
        {
          display: "Required",
          associatedClickFunction:  this.organizationHandleClosed
        },
        {
          display: "Recommended",
          associatedClickFunction:  this.organizationHandleClosed
        },
        {
          display: "All Courses",
          associatedClickFunction:  this.organizationHandleClosed
        }
      ]
    }

    return [sortByInfo, topicInfo, organizationInfo];
  }



  render() {
    // Mappings

    const menuItems = this.buildMenuItems();
    const searchInfo = {
      value: this.state.searchValue,
      onChange: this.handleSearchChange,
      onClick: this.handleSearchClicked
    }

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
        <CourseLibraryToolbar menuItems={menuItems} searchInfo={searchInfo}></CourseLibraryToolbar>
          <div className="course-list">
            {listItems}
          </div>
      </div>

      );
  }
}

export default CourseLibrary;
