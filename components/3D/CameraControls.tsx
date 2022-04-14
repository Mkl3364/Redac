import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as three from "three";


const CameraControls = () => {

    const {
        camera,
        gl: {domElement}
    } = useThree();
    
    const controls = useRef<any>();
    useFrame((state) => controls.current!.update())
    return (
        <orbitControls ref={controls} args={[camera, domElement]} />
    );
};

export default CameraControls;