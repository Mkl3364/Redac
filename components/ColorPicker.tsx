import { Button } from '@mui/material';
import React, { useState } from 'react';
import { ColorPicker as ColorPickup, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Modal from 'react-modal';

export default function ColorPicker(props: any) {

    const [showModal, setShowModal] = useState<boolean>(false)

    const customStyles = {

        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    const [color, setColor] = useColor("hex", "#121212");
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    
    const closeModal = () => {
        setIsOpen(false);
    }

    const handleClickOpen = () => {

        setShowModal(props.modal)

    }

    return (
        <div>
        <Button variant='outlined' onClick={handleClickOpen}> Ajouter une couleur</Button>
        { showModal === true &&
        <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        >

        <ColorPickup width={456} height={228} color={color} onChange={setColor} hideHSV dark />
        
        </Modal>
        }
        </div>
      
    )

}