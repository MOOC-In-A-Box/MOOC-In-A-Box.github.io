import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import { IconButton  } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import './SearchBar.css';

function SearchBar(props) {
    return(
      <div className="search-bar">
          <TextField value={props.searchValue} onChange={props.onChange} id="outlined-search" type="search" variant="outlined"  color="black"/>
          <IconButton className="menu-button" onClick={props.onSearchClicked}>
            <SearchIcon className="search-bar-icon" />
          </IconButton>
      </div>
    )
  }

  export default SearchBar
  

