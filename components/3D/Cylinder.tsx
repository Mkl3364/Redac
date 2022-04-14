import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Cylinder(props: any) {

    const { color } = props;

    const mesh = useRef<any>()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current!.rotation.x += 0.01))

    

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 0.5}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            
            <cylinderGeometry args={[1, 1, 5, 24, 2, false]}/>
            <meshStandardMaterial color={hovered ? color : 0xffffff} />
        </mesh>
    );
}

// args?: [radiusTop?: number | undefined, radiusBottom?: number | undefined, height?: number | undefined, radialSegments?: number | undefined, heightSegments?: number | undefined, openEnded?: boolean | undefined, thetaStart?: number | undefined, thetaLength?: number | undefined] | undefined
