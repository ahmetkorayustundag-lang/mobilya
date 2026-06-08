import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useDesignStore } from '../store/designStore'

export default function Canvas3D() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const furnitureItems = useDesignStore(state => state.furnitureItems)
  const selectedItem = useDesignStore(state => state.selectedItem)
  const selectItem = useDesignStore(state => state.selectItem)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f5f5)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(300, 300, 300)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(100, 100, 100)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const groundGeometry = new THREE.PlaneGeometry(1000, 1000)
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    const furniture3DObjects = new Map()

    const createFurnitureGeometry = (item) => {
      const geometry = new THREE.BoxGeometry(
        item.width / 10,
        item.height / 10,
        item.depth / 10
      )
      const material = new THREE.MeshStandardMaterial({ color: item.color })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.position.y = (item.height / 10) / 2
      mesh.userData.furnitureId = item.id
      return mesh
    }

    const updateFurniture = () => {
      furniture3DObjects.forEach((mesh, id) => {
        if (!furnitureItems.find(item => item.id === id)) {
          scene.remove(mesh)
          furniture3DObjects.delete(id)
        }
      })

      furnitureItems.forEach(item => {
        if (!furniture3DObjects.has(item.id)) {
          const mesh = createFurnitureGeometry(item)
          mesh.position.set(item.x / 10, 0, item.y / 10)
          scene.add(mesh)
          furniture3DObjects.set(item.id, mesh)
        } else {
          const mesh = furniture3DObjects.get(item.id)
          mesh.position.set(item.x / 10, 0, item.y / 10)
          mesh.material.color.setHex(parseInt(item.color.replace('#', '0x')))
        }

        const mesh = furniture3DObjects.get(item.id)
        if (selectedItem?.id === item.id) {
          mesh.material.emissive.setHex(0x444444)
        } else {
          mesh.material.emissive.setHex(0x000000)
        }
      })
    }

    updateFurniture()

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(Array.from(furniture3DObjects.values()))

      if (intersects.length > 0) {
        const selected = intersects[0].object
        selectItem(selected.userData.furnitureId)
      } else {
        selectItem(null)
      }
    }

    renderer.domElement.addEventListener('click', handleClick)

    const animate = () => {
      requestAnimationFrame(animate)
      updateFurniture()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('click', handleClick)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [furnitureItems, selectedItem])

  return <div ref={containerRef} className="canvas-3d" />
}