import React, { ReactElement, useEffect } from 'react'

import * as THREE from 'three'

import { OrbitControls } from '@three-ts/orbit-controls'

import './styles.module.scss'

export function UserPage (): ReactElement {
  useEffect(() => {
    const scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(50, 50, 50)

    const Size = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 10, 0)

    scene.add(mesh)

    const camera = new THREE.PerspectiveCamera(30, Size.width / Size.height, 1, 1000)
    camera.position.set(292, 223, 185)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(Size.width, Size.height)
    renderer.render(scene, camera)
    document.body.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => {
      renderer.render(scene, camera)
    })
  }, [])

  return (
    <>
      <div></div>
    </>
  )
}
