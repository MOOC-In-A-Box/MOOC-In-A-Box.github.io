import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';




const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    maxHeight: 400,
    minHeight: 400,
    position: 'relative',
  },
  media: {
    paddingTop: '56.25%', // 16:9
    maxWidth: '50%',
    height: '40%',
    marginLeft: "auto",
    marginRight: "auto"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  actionsRow: {
    position: 'absolute',
    bottom: 0,
    left: 0
  }, 
  content: {
    paddingBottom: '1rem'
  }
}));

export default function CourseCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false)

  console.log(props.course);

  if ( props.isCourseAFavorite != isFavorited){
    setIsFavorited(props.isCourseAFavorite);
  }


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const favoriteButtonClicked = () => {
    if (isFavorited) {
      setIsFavorited(false);
      props.removeFavoriteClicked(props.course);
    } else {
      setIsFavorited(true);
      props.favoriteClicked(props.course);
    }
   
  }

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        title={props.course.title}
        subheader={props.course.owner.displayName}
        action={
          <IconButton aria-label="add to favorites" onClick={favoriteButtonClicked}>
           { isFavorited ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />  } 
          </IconButton>
        }
      />
      <CardMedia
        className={classes.media}
        image={props.course.thumbnailUrl ? props.course.thumbnailUrl: "/static/images/cards/paella.jpg"}
        title="Paella dish"
      />
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.course.description}
        </Typography> 
        <Typography variant="body2" color="textSecondary" component="p">
          {props.course.owner.displayName}
        </Typography>
      </CardContent>
      <CardActions className={classes.actionsRow} disableSpacing>
        <Button 
          variant="contained" 
          color="secondary"
          component={Link}
          to={`/courseOverview/${props.course.id}`}
          >
            Overview
        </Button>
      </CardActions>
    </Card>
  );
}