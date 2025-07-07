import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {Preload, OrbitControls } from "@react-three/drei";
import Modal from "./Components/Modal";
import Dome from "./Components/Dome";
import Sound from './Components/Sound'
import { useCallback } from "react";


const Directionstore = [
  {
    name: "outside",
    color: "lightpink",
    position: [20, -5, -3],
    url: "/room.webp",
    link: 0,
  },
  {
    name: "snow",
    color: "lightblue",
    position: [10, 0, -3],
    url: "/bed.webp",
    link: 1,
  },
  {
    name: "Top",
    color: "hotpink",
    position: [0, 0, 10],
    url: "/nature.webp",
    link: 2,
  },
 
];

const infoStore = [
  {
    pos: [20, 0, 20],
    sort: 0,
  },
  {
    pos: [10, 0, -3],
    sort: 2,
  },
  {
    pos: [20, 0, -3],
    sort: 3,
  },
]



// In src/App.js - Update the Portals component
const Portals = ({ modal, setModal }) => {
  const [which, setWhich] = useState(0);
  const { link, ...props } = Directionstore[which];
  const { sort, pos } = infoStore[which];
  
  // Only load current texture and next/previous ones
  const maps = useLoader(THREE.TextureLoader, Directionstore.map((entry) => entry.url));
  
  // Add cleanup effect
  useEffect(() => {
    return () => {
      // Dispose textures when component unmounts
      maps.forEach(texture => {
        if (texture && texture.dispose) {
          texture.dispose();
        }
      });
    };
  }, [maps]);

  return (
    <Dome 
      setModal={setModal}
      modal={modal}
      which={which}
      setWhich={setWhich}
      {...props}
      texture={maps[which]}
      sort={sort}
      pos={pos}
    />
  );
};

function App() {
  const [modal, setModal] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [startUp, setStartUp] = useState(false);
  console.log("APP");

  const handleRotate = useCallback(() => {
    setRotate(!rotate);
  },[rotate]);
  
  


  return (
    <div onDoubleClick={handleRotate} className="container">
    {/* { !startUp &&<StartUpModal startUp={startUp} setStartUp={setStartUp} />} */}
    {modal &&  <Modal setModal={setModal} modal={modal} /> }

   <Sound />
     
      <Canvas  frameloop="demand" camera={{ fov: 90,position: [0, 0, 0.1] }}>
       
        <Suspense fallback={null}>
          <Preload all />
          <Portals modal={modal} setModal={setModal}  />
          {/* <axesHelper  /> */}
        </Suspense>

        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.2}
          autoRotate={rotate}
          rotateSpeed={-0.3}
        />
      </Canvas>
    </div>
  );
}

export default App;
