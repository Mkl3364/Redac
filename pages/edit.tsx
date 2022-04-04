import React, { useContext, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Box from '../components/Box'
import Header from '../components/Header';
import ColorPicker from '../components/ColorPicker';
import ColorPickerContext from '../context/ColorPickerContext';
import ColorPickerProvider from '../context/ColorPickerProvider';
import { Button } from '@mantine/core';

const edit = () => {

    const color = useContext(ColorPickerContext)
    const [boxState, setBoxState] = useState<boolean>(false)

    const handleClickAddBox = () => {
        setBoxState(!boxState);
    }

    return (
        <>
            <Header titre="Site e-commerce | Edition" />
            <ColorPickerProvider>
            <div>
            <ColorPicker />
            <Button variant="light" color="blue" onClick={handleClickAddBox}> Ajoute un composant </Button>
            </div>
            <Canvas style={{ height: '1000px' }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                {boxState ? <Box position={[3.9, 0, 0]} /> : '' }
            </Canvas>
            </ColorPickerProvider>
        </>
    );

};

export default edit;