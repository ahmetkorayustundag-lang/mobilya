import React, { useRef, useEffect, useState } from 'react'
import { useDesignStore } from '../store/designStore'
import { calculateArea } from '../utils/furnitureData'

export default function Canvas2D() {
  const canvasRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  
  const furnitureItems = useDesignStore(state => state.furnitureItems)
  const selectedItem = useDesignStore(state => state.selectedItem)
  const selectItem = useDesignStore(state => state.selectItem)
  const updateFurnitureItem = useDesignStore(state => state.updateFurnitureItem)
  const removeFurnitureItem = useDesignStore(state => state.removeFurnitureItem)

  const SCALE = 0.5

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    furnitureItems.forEach(item => {
      const x = item.x * SCALE
      const y = item.y * SCALE
      const w = item.width * SCALE
      const h = item.depth * SCALE

      if (selectedItem?.id === item.id) {
        ctx.fillStyle = 'rgba(100, 150, 255, 0.2)'
        ctx.strokeStyle = '#6496FF'
        ctx.lineWidth = 3
      } else {
        ctx.fillStyle = item.color
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 2
      }

      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(x, y, w, h)

      ctx.fillStyle = '#000'
      ctx.font = '12px Arial'
      ctx.fillText(item.name, x + 5, y + 20)
      ctx.fillText(`${item.width}×${item.depth}cm`, x + 5, y + 35)
    })
  }, [furnitureItems, selectedItem])

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / SCALE
    const y = (e.clientY - rect.top) / SCALE

    let clicked = false
    for (let i = furnitureItems.length - 1; i >= 0; i--) {
      const item = furnitureItems[i]
      if (
        x >= item.x && x <= item.x + item.width &&
        y >= item.y && y <= item.y + item.depth
      ) {
        selectItem(item.id)
        clicked = true
        setIsDragging(true)
        setDragOffset({
          x: x - item.x,
          y: y - item.y
        })
        break
      }
    }
    
    if (!clicked) {
      selectItem(null)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedItem) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / SCALE - dragOffset.x
    const y = (e.clientY - rect.top) / SCALE - dragOffset.y

    updateFurnitureItem(selectedItem.id, { x, y })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && selectedItem) {
      removeFurnitureItem(selectedItem.id)
    }
    if (selectedItem && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
      const step = e.shiftKey ? 10 : 1
      let newX = selectedItem.x
      let newY = selectedItem.y
      
      if (e.key === 'ArrowUp') newY -= step
      if (e.key === 'ArrowDown') newY += step
      if (e.key === 'ArrowLeft') newX -= step
      if (e.key === 'ArrowRight') newX += step
      
      updateFurnitureItem(selectedItem.id, { x: newX, y: newY })
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const furniture = JSON.parse(e.dataTransfer.getData('furniture'))
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / SCALE
    const y = (e.clientY - rect.top) / SCALE

    const newItem = {
      ...furniture,
      x,
      y,
      id: Date.now()
    }
    useDesignStore.getState().addFurnitureItem(newItem)
  }

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="canvas-2d"
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      tabIndex="0"
    />
  )
}