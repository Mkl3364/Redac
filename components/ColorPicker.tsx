import React, { useContext, useEffect } from 'react';
import { Color, ColorPicker as ColorPickup, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import ColorPickerContext from '../context/ColorPickerContext';

export default function ColorPicker(props: any ) {

    const { colorContext, setColorContext } = useContext(ColorPickerContext);

    const [color, setColor] = useColor("hex", colorContext)

    useEffect(() => {
        setColorContext(color.hex)
        console.log('tttt', colorContext)
    }, [color])

    return (
        <div>
        <ColorPickup width={256} height={228} color={color} onChange={setColor} hideHSV dark />
        </div>
    );
}