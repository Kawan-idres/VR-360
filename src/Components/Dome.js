import { Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { ReactComponent as Mark } from '../Assets/mark.svg';
import { useSpring, animated } from '@react-spring/three';
import { useState, useEffect } from 'react';

const Dome = ({ name, color, texture, onClick, which, setWhich, modal, setModal, pos, sort }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hotspotHovered, setHotspotHovered] = useState(false);

  // Loading animation
  const { position } = useSpring({
    to: { position: 0 },
    from: { position: -100 },
    config: { mass: 5, tension: 500, friction: 150 },
  });

  // Hotspot hover animation
  const { scale } = useSpring({
    scale: hotspotHovered ? 1.3 : 1,
    config: { tension: 300, friction: 20 }
  });

  // Check if texture is loaded
  useEffect(() => {
    if (texture) {
      setIsLoading(false);
    }
  }, [texture]);

  const handleClick = () => {
    if (which === 0 && name === "outside" && sort === 0) {
      setWhich(1);
    }
    if (which === 1 && name === "inside") {
      setWhich(0);
    }
    if (which == 1) {
      setWhich(2);
    }
    if ((which == 2) && name === "Top") {
      setWhich(0);
    }
  };

  return (
    <group>
      <animated.mesh position={position}>
        <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
      </animated.mesh>

      {/* Navigation Hotspot with hover effect */}
      <animated.mesh 
        position={[-20, 0, 10]}
        scale={scale}
        onPointerEnter={() => setHotspotHovered(true)}
        onPointerLeave={() => setHotspotHovered(false)}
      >
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color={hotspotHovered ? "white" : color} />
        <Html center>
          <p onClick={handleClick} className={`spot ${hotspotHovered ? 'spot-hovered' : ''}`}>
            {name}
          </p>
        </Html>
      </animated.mesh>

      {/* Info Hotspot with pulsing effect */}
      <mesh position={pos}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0} />
        <Html center>
          <p onClick={() => { setModal(true); }} className="spot info-spot">
            {!modal && <Mark className="mark pulsing" />}
          </p>
        </Html>
      </mesh>

      {/* Loading Indicator */}
      {isLoading && (
        <Html center>
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading scene...</p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Dome;