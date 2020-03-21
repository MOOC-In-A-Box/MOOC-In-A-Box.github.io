import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';


function CourseLibraryToolbarMenuItem(props){
    return (
          <MenuItem onClick={props.handleClick}>{props.value}</MenuItem>
    )
  }

  export default CourseLibraryToolbarMenuItem