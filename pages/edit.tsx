import React, { useState } from 'react';
import { Canvas, extend, Object3DNode } from '@react-three/fiber';
import Box from '../components/3D/Box'
import Header from '../components/Header';
import { Button } from '@mantine/core';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Cylinder from '../components/3D/Cylinder';
import { OrbitControls, TransformControls } from 'three-stdlib'
import CameraControls from '../components/3D/CameraControls';
extend({ OrbitControls, TransformControls })

const Edit = () => {

    const [boxState, setBoxState] = useState<boolean>(false)
    const [color, setColor] = useColor("hex", "#121212")

    const handleClickAddBox = () => {
        setBoxState(!boxState);
    } 

    return (
        <>
            <Header titre="Site e-commerce | Edition" />
            <div>
            <ColorPicker width={256} height={98} color={color} onChange={setColor} hideHSV dark />
            <Button variant="light" color="blue" onClick={handleClickAddBox}> Ajoute un composant </Button>
            </div>
            <Canvas style={{ height: '500px' }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <CameraControls />
                <Box position={[0, 0, 0]} color={color.hex}/>
                <Cylinder position={[-3.9, 0, 0]}/>
                {boxState ? <Box position={[3.9, 0, 0]} color={color.hex}/> : '' }
            </Canvas>
        </>
    );

};

export default Edit;

class CustomElement extends OrbitControls {}
extend({CustomElement})

declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls : Object3DNode<CustomElement, typeof CustomElement>
        }
    }
}

;<orbitControls />