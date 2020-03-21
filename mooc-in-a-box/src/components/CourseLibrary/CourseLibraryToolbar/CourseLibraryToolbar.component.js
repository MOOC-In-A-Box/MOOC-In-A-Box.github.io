import React from 'react';

import {AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import {Button} from '@material-ui/core';

import SearchBar from './SearchBar/SearchBar.component';
import CourseLibraryToolbarMenu from './CourseLibraryToolbarMenu/CourseLibraryToolbarMenu.component'


//<CourseLibraryMenu handleClose={this.handleClose} sortByElement={props.state.sortByElement}></CourseLibraryMenu>


function CourseLibraryToolbar(props){

    let menuButtons = props.menuItems.map(menuItem => {
        return (
            <Button
                color="inherit" 
                className="menu-button"
                onClick={menuItem.clickedFunction}
            >
                {menuItem.buttonText}
            </Button>
        )
    })

    let menus = props.menuItems.map(menuItem => {
        return(
            <CourseLibraryToolbarMenu
                element={menuItem.element}
                closeFunction = {menuItem.closeFunction}
                options={menuItem.menuOptions}
                menuId={menuItem.menuId}
            >
            </CourseLibraryToolbarMenu>
        )
    })

    return(
        <AppBar position="static" className="course-library-app-bar">
            <Toolbar>
                {menuButtons}
                <SearchBar searchValue={props.searchInfo.value} onChange={props.searchInfo.onChange} onSearchClicked={props.searchInfo.onClick}></SearchBar>
            </Toolbar>
            {menus}
      </AppBar>
    )
}

export default CourseLibraryToolbar