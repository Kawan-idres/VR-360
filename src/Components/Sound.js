import React, { useState, useEffect } from "react";
import S from '../Sounds/N.mp3'
import MusicModal from "./MusicModal";

const useAudio = () => {

  
  const [audio] = useState(new Audio(S));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  // useEffect(() => {
  //   audio.addEventListener('ended', () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener('ended', () => setPlaying(false));
  //   };
  // }, []);

  return [playing, toggle,setPlaying];
};

const Player =  ({ url }) => {

  console.log("sound");
  const [playing, toggle,setPlaying] = useAudio();
  const [modalHider,setModalHider]=useState(true);
  console.log("modalHider :"+modalHider);


  return (
    <>
    { modalHider && <MusicModal setModalHider={setModalHider} playing={playing} setPlaying={setPlaying} />}
    <div className="sound-btn-cont">
      <button className="sound-btn" onClick={toggle}>{playing ? "Pause Audio" : "Play Audio"}</button>
    </div>
    </>
  );
};

export default React.memo(Player);