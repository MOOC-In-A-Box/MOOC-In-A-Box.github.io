import React, { useState } from 'react';
import {
  Link as RouterLink,
} from "react-router-dom";
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

function CoursesDropdownComponent(props) {
    return (
      <ExpansionPanel>
              <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography variant="subtitle2">{props.courses.length} Course(s)</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                      <div>
                          <List dense="true">
                          {
                            props.courses.map( course => {
                              return (
                                <span>
                                  <ListItem 
                                  >
                                    <Button
                                      component={RouterLink} 
                                      to={`/courseOverview/${course.id}`}
                                    >
                                      {course.title}
                                    </Button>
                                    { props.includeEditIcon && 
                                      <IconButton className="menu-button" color="inherit" aria-label="menu">
                                        <EditIcon/>
                                      </IconButton>
                                    }
                                  </ListItem>
                                </span>
                                
                              )
                            })
                          }
                          </List>
                      </div>
                      </Grid>
                  </Grid>
              </ExpansionPanelDetails>
          </ExpansionPanel>
    )
  }

  export default CoursesDropdownComponent;
