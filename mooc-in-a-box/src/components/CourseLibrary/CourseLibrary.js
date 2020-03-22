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
      sortFilterValue: null,
      topicFilterValue: null,
      organizationFilterValue:null

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

  sortByHandleClose = (value) => {
    console.log(value);
    this.setState({
      sortByElement: null,
      sortFilterValue: value
    });
  };


  /** Topic Functions */
  topicClicked = event => {
    this.setState({
      topicElement: event.currentTarget
    });
  };

  topicHandleClose = (value) => {
    this.setState({
      topicElement: null,
      topicFilterValue: value
    });
  };

  /** Organization functions */
  organizationClicked = event => {
    this.setState({
      organizationElement: event.currentTarget
    });
  };

  organizationHandleClosed = (value) => {
    this.setState({
      organizationElement: null,
      organizationFilterValue: value
    });
  };

  buildMenuItems = () => {
    const sortByInfo = {
      buttonText: "Sort By",
      menuId: "menu-sort-by",
      clickedFunction: this.sortByClicked,
      closeFunction: this.sortByHandleClose,
      element: this.state.sortByElement,
      radioGroupName: "menuRadio",
      menuValue: this.state.sortFilterValue,
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
      radioGroupName: "topicRadio",
      menuValue: this.state.topicFilterValue,
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
      radioGroupName: "organizationRadio",
      menuValue: this.state.organizationFilterValue,
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
    console.log(this.state);

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
