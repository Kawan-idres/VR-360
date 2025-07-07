import React,{Fragment} from 'react'

const StartUpModal = ({startUp,setStartUp}) => {
    const  handleEvents=()=>{
        setStartUp(true);
    }


  return (

    <Fragment>

    <div  className="modal" onClick={handleEvents} onDrag={handleEvents}></div>
    <div className='logo360' onClick={handleEvents} onDrag={handleEvents}>
    
        <img src="360svg.png" alt="360 png" className='img360' />
    </div>


    </Fragment>
    )
}

export default StartUpModal