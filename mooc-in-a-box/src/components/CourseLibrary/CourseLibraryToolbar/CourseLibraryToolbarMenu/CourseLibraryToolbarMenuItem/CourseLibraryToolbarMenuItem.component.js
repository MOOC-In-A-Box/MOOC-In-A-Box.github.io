import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function CourseLibraryToolbarMenuItem(props){
    return (
      <FormControlLabel value={props.value} control={<Radio />} label={props.value} />
    )
  }

  export default CourseLibraryToolbarMenuItem