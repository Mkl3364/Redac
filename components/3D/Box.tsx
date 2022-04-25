import React, { useRef, useState } from 'react';
import {
    Canvas,
    useLoader,
    useFrame,
    extend,
    useThree

} from '@react-three/fiber';

export default function Box(props: any) {

    const { color } = props;

    const mesh = useRef<any>()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    //useFrame(() => (mesh.current!.rotation.x += 0.01))


    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 0.5}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 5, 2]} />

            <meshStandardMaterial color={hovered ? color : 0xffffff} />
        </mesh>
    );
}
