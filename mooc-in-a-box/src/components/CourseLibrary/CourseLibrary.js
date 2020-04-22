import React from 'react';
import './CourseLibrary.css';
import { Button } from '@material-ui/core';
import CourseCard from '../CourseCard/CourseCard';
import { render } from '@testing-library/react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SearchBar from './CourseLibraryToolbar/SearchBar/SearchBar.component';
import CourseLibraryMenu from './CourseLibraryToolbar/CourseLibraryToolbarMenu/CourseLibraryToolbarMenu.component'
import CourseLibraryToolbar from './CourseLibraryToolbar/CourseLibraryToolbar.component'

import * as FirebaseService from '../../service/firebase.service';


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
    this.favoriteClicked = this.favoriteClicked.bind(this);
    this.enrollClicked = this.enrollClicked.bind(this);
    this.removeFavoriteClicked = this.removeFavoriteClicked.bind(this);
    this.state = {
      searchValue: "",
      sortByElement: null,
      topicElement: null,
      organizationElement: null,
      sortFilterValue: null,
      topicFilterValue: null,
      organizationFilterValue: null,
      activeCourses: props.courses
    }
    props.routeClicked("Course Library");
  }

  /** Search Function */
  handleSearchChange(e) {
    const searchValue = e.target.value;
    const searchValueLowerCase = searchValue.toLowerCase();
    const activeCourses = this.props.courses.filter(course =>
      (course.title?.toLowerCase().includes(searchValueLowerCase)
        || course.description?.toLowerCase().includes(searchValueLowerCase)
        || course.owner.displayName?.toLowerCase().includes(searchValueLowerCase)
      ))
    this.setState({
      searchValue,
      activeCourses
    })
  }

  handleSearchClicked(e) {
  }

  /** Sort By Functions */
  sortByClicked = event => {
    this.setState({
      sortByElement: event.currentTarget
    });
  };

  sortByHandleClose = (value) => {
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

  async favoriteClicked(course) {
    await FirebaseService.favoriteCourse(this.props.user, course);
    this.props.updateUser(this.props.user.id)
  }

  async removeFavoriteClicked(course) {
    await FirebaseService.removeFavoriteCourse(this.props.user, course);
    this.props.updateUser(this.props.user.id)
  }

  async enrollClicked(course) {
    let enrolled = false;
    if (this.props.user.enrolledCourses) {
      enrolled = this.props.user.enrolledCourses.find(c => {
        return c.id === course.id;
      })
    }

    if (enrolled) {
      await FirebaseService.unenrollInCourse(this.props.user, course);
    } else {
      await FirebaseService.enrollInCourse(this.props.user, course);
    }

    this.props.updateUser(this.props.user.id);
  }

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
          associatedClickFunction: this.sortByHandleClose
        },
        {
          display: "Recommended",
          associatedClickFunction: this.sortByHandleClose
        },
        {
          display: "Trending",
          associatedClickFunction: this.sortByHandleClose
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
          associatedClickFunction: this.topicHandleClose
        },
        {
          display: "Technology",
          associatedClickFunction: this.topicHandleClose
        },
        {
          display: "History",
          associatedClickFunction: this.topicHandleClose
        },
        {
          display: "Arts",
          associatedClickFunction: this.topicHandleClose
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
          associatedClickFunction: this.organizationHandleClosed
        },
        {
          display: "Recommended",
          associatedClickFunction: this.organizationHandleClosed
        },
        {
          display: "All Courses",
          associatedClickFunction: this.organizationHandleClosed
        }
      ]
    }

    return [sortByInfo, topicInfo, organizationInfo];
  }

  isCourseAFavorite = (user, course) => {

    if (user.favoritedCourses && user.favoritedCourses.length > 0) {
      return user.favoritedCourses
        .find(favoritedCourse => favoritedCourse.id === course.id);
    }
    return false;
  }

  isCourseEnrolled = (user, course) => {

    if (user.enrolledCourses && user.enrolledCourses.length > 0) {
      return user.enrolledCourses.find(c => c.id === course.id);
    }
    return false;
  }

  render() {
    // Mappings
    const menuItems = this.buildMenuItems();
    const favoriteClicked = this.favoriteClicked;
    const isCourseAFavorite = this.isCourseAFavorite;
    const removeFavoriteClicked = this.removeFavoriteClicked
    const enrollClicked = this.enrollClicked;
    const isCourseEnrolled = this.isCourseEnrolled;

    const user = this.props.user;
    const searchInfo = {
      value: this.state.searchValue,
      onChange: this.handleSearchChange,
      onClick: this.handleSearchClicked
    }
    let listItems = []
    if (user) {

      listItems = this.state.activeCourses.map(function (item) {
        return (
          <Grid item s={4}>
            <CourseCard course={item} enrollClicked={enrollClicked} isCourseEnrolled={isCourseEnrolled(user, item)} favoriteClicked={favoriteClicked} removeFavoriteClicked={removeFavoriteClicked} isCourseAFavorite={isCourseAFavorite(user, item)}></CourseCard>
          </Grid>
        );
      });
    }

    return (
      <div class="course-library">
        <CourseLibraryToolbar menuItems={menuItems} searchInfo={searchInfo}></CourseLibraryToolbar>
        <div className="course-list">
          <Grid container spacing={3}>
            {listItems}
          </Grid>
        </div>
      </div>

    );
  }
}

export default CourseLibrary;
