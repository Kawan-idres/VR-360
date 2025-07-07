import { Html} from "@react-three/drei";
import * as THREE from "three";
import {ReactComponent as Mark} from '../Assets/mark.svg';
import { useSpring, animated } from '@react-spring/three'






const Dome = ({ name,color, texture, onClick,which,setWhich,modal,setModal,pos,sort,col }) => {


  console.log("Demo ");
  
  const { position } = useSpring({
    to: {
      position: 0,
    },
    from: { position: -100},
    config: { mass: 5, tension: 500, friction: 150 },
  })
 
 





  const handleClick=()=>{
    if(which===0 && name === "outside" && sort===0){
      setWhich(1);

    }
    if(which ===1 && name ==="inside"){
      setWhich(0);
    }
    if(which==1 ){
      setWhich(2)

    }

    if((which==2) && name==="Top"  ){
      setWhich(0)

    }
  }
    return (
        <group>
          < animated.mesh   position={position} >
            <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
            <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
          </animated.mesh>

          <mesh position={[-20, 0, 10]}>
            <sphereGeometry args={[1.25, 32, 32]} />
            <meshBasicMaterial color={color} />
            <Html center>

                <p  onClick={handleClick}  className="spot">
                  {name}
              </p>

            </Html>
          </mesh>


          <mesh   position={pos}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0} />
            <Html center>

                <p onClick={()=>{setModal(true); }}  className="spot">
                
                  { !modal &&<Mark className="mark" />}
                </p>
             
            </Html>
          </mesh>

        
        </group>
      );
}

export default Dome