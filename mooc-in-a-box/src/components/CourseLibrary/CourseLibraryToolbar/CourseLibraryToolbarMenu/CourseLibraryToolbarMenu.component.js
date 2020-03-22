import React from 'react';

import Menu from '@material-ui/core/Menu';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';

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

  const onChangeFunction = (event) => {
    props.closeFunction(event.target.value)
  }

    return (
      <Menu
          id={props.menuId}
          anchorEl={props.element}
          keepMounted
          open={Boolean(props.element)}
          onClose={props.closeFunction}
        >
          <MenuItem>
            <FormControl component="fieldset">
            <FormLabel component="legend">{props.menuLabel}</FormLabel>
            <RadioGroup aria-label="gender" name={props.radioGroupName} value={props.menuValue} onChange={onChangeFunction}>
              {menuItems}
            </RadioGroup>
            </FormControl>
          </MenuItem>
      </Menu>
    )
  }

  export default CourseLibraryToolbarMenu