import { useSpring, animated } from "@react-spring/three"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Mesh } from "three"

export default function Box(props: any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
  
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
  
    const {scale,color} = useSpring({
      scale:active ? [1.5,1.5,1.5] : [1,1,1],
      color: hovered ? 'hotpink' : 'orange'
    })
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
      if(mesh.current != null){
        (mesh.current as Mesh).rotation.x = (mesh.current as Mesh).rotation.y += 0.01
      }
    })


  
    return (
      <animated.mesh
        {...props}
        ref={mesh}
        scale={scale}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <animated.meshStandardMaterial color={color} />
      </animated.mesh>
    )
  }