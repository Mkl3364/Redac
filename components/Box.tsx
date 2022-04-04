import React, { useContext, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import ColorPickerContext from '../context/ColorPickerContext';

export default function Box(props: any) {

    const { colorContext } = useContext(ColorPickerContext);

    console.log('depuis Box', colorContext)

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
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 2, 3]} />
            <meshStandardMaterial color={hovered ? colorContext : colorContext} />
        </mesh>
    );
}
