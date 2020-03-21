import React from 'react';

import Menu from '@material-ui/core/Menu';

import CourseLibraryToolbarMenuItem from './CourseLibraryToolbarMenuItem/CourseLibraryToolbarMenuItem.component';



function CourseLibraryToolbarMenu(props){

  let menuItems = props.options.map( option => {
    return (
      <CourseLibraryToolbarMenuItem
        handleClick={option.associatedClickFunction}
        value={option.display}>
      </CourseLibraryToolbarMenuItem>
    )
  })


    return (
      <Menu
          id={props.menuId}
          anchorEl={props.element}
          keepMounted
          open={Boolean(props.element)}
          onClose={props.closeFunction}
        >
          {menuItems}
      </Menu>
    )
  }

  export default CourseLibraryToolbarMenu