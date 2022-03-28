import React, { useEffect } from 'react';
import ColorPicker from '../components/ColorPicker';
import styles from '../styles/Home.module.css'
import {Scene, WebGL1Renderer, PerspectiveCamera, CylinderGeometry, MeshBasicMaterial, Mesh, ColorRepresentation} from 'three'
import { Color } from 'react-color-palette';

const scene = new Scene()
const renderer = new WebGL1Renderer()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

interface EditInterface {
    color: Color['hex']
}

const Edit = (props: EditInterface) => {

    const {color} = props;

//    const updateColor = () => {
//    const newColor = color.slice(1) as unknown as ColorRepresentation
//    console.log(newColor)
//        new MeshBasicMaterial({color: newColor});
//        return newColor;   
//    }
//
//    updateColor()

    useEffect(() => {
        const geometry = new CylinderGeometry(5, 5, 10, 32)
        const material = new MeshBasicMaterial({color: 0x00FFF, wireframe: true})
        const cylinder = new Mesh(geometry, material)
        scene.add(cylinder)
        camera.position.z = 20;
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        const animate = () => {
            cylinder.rotation.x += 0.01
            cylinder.rotation.y += 0.01
    
            renderer.render(scene, camera);
            requestAnimationFrame(animate)
        }

        animate()

    }, [])

    return (
        <div className={styles.card}>
        <ColorPicker modal={true}/>
        </div>
    );
};

export default Edit;