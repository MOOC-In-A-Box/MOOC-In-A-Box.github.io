import React, { useState, useEffect } from 'react';
import './EditCourseNavigationPane.css';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core';



/**
 * Generate multiple function
 */


function generate(element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  


function EditCourseNavigationPane() {
    return (
        <Paper className="paper">

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography variant="subtitle2">Topic 1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div>
                        <List dense="true">
                        {generate(
                            <ListItem>
                                <ListItemText
                                    primary="SubTopic"
                                />
                            </ListItem>,
                        )}
                            <ListItem>
                                <Button variant="contained" color="primary">
                                    Add New Content
                                </Button>
                            </ListItem>
                        </List>
                    </div>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography variant="subtitle2">Topic 2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div>
                        <List dense="true">
                        {generate(
                            <ListItem>
                                <ListItemText
                                    primary="SubTopic2"
                                />
                            </ListItem>,
                        )}
                            <ListItem>
                                <Button variant="contained" color="primary">
                                    Add New Content
                                </Button>
                            </ListItem>
                        </List>
                    </div>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <Button variant="contained" color="primary">
            Add New Lesson
        </Button>

    </Paper>
    )
}

export default EditCourseNavigationPane;