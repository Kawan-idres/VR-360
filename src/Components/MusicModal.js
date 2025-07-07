import React, { Fragment } from 'react'
import ReactDom from 'react-dom'


const MusicModal = ({playing,setPlaying,setModalHider}) => {

    console.log("music modal");
    const play=()=>{
        setPlaying(true);
        setModalHider(false)

    }
    const pause=()=>{
        setPlaying(false);
        setModalHider(false)
    }
    return ReactDom.createPortal (
        <Fragment>
        <div  className="modal">    </div>
        <div className="modal-center">
          <div className="music-modal-content">
          <h1> Would You Like play an Audio </h1>
          <div className='music-btn-cont'>
          <button onClick={play} className='music-btn'>Yes</button>
          <button onClick={pause} className='music-btn'>No</button>
          </div>
          <p className='rotate-p'>try double click to stop and start
           rotation</p>

          </div>
          </div>
    
          </Fragment>,document.getElementById("modal")
      );
    }

export default MusicModal