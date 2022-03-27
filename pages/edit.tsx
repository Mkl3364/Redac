import { Button } from '@mantine/core';
import React from 'react';
import ColorPicker from '../components/ColorPicker';
import styles from '../styles/Home.module.css'
import {Scene, WebGL1Renderer, PerspectiveCamera, CylinderGeometry, MeshBasicMaterial, Mesh} from 'three'

const scene = new Scene()
const renderer = new WebGL1Renderer()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const Edit = () => {

    const geometry = new CylinderGeometry(5, 5, 10, 32)
    const material = new MeshBasicMaterial({color: 0x00a6ff, wireframe: true})
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

    return (
        <div className={styles.card}>
        <ColorPicker modal={true}/>
        </div>
    );
};

export default Edit;