import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ColorPicker as ColorPickup, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Modal from 'react-modal';
import Edit from '../pages/edit';

export default function ColorPicker(props: any) {

    const [color, setColor] = useColor("hex", "#121212");

    useEffect(() => {
        <Edit color={color["hex"]} />
    }, [color])

    return (
        <div>
        <ColorPickup width={256} height={228} color={color} onChange={setColor} hideHSV dark />
        </div>
      
    )

}