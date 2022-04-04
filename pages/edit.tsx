import React, { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Box from '../components/Box'
import Header from '../components/Header';
import ColorPicker from '../components/ColorPicker';
import ColorPickerContext from '../context/ColorPickerContext';
import ColorPickerProvider from '../context/ColorPickerProvider';

const edit = () => {

    const color = useContext(ColorPickerContext)

    return (
        <>
            <Header titre="Site e-commerce | Edition" />
            <ColorPickerProvider>
            <div>
            <ColorPicker />
            </div>
            <Canvas style={{ height: '1000px' }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>
            </ColorPickerProvider>
        </>
    );

};

export default edit;