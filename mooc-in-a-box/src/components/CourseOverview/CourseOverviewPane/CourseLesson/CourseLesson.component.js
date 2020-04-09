import React from 'react';
import YouTube from 'react-youtube';

function EditCourseLesson(props) {


    function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
   
    let urlDefaultValue = "Eo-KmOd3i7s";



    if(props.lesson){
        return (
            <div>
                <h3>{props.lesson.title}</h3>
                <h6>Link: {props.lesson.video}</h6>
                <strong>Description: </strong>
                <p>{props.lesson.description}</p>
                <YouTube videoId={urlDefaultValue} opts={opts} onReady={_onReady} />
            </div>
        )
    } else {
        return (
            <div>
                <h5> No Lesson Details </h5>
            </div>
        )
    }
    
}

export default EditCourseLesson;