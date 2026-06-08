import React, { useState } from 'react'
import { FURNITURE_CATALOG, COLORS } from '../utils/furnitureData'
import { useDesignStore } from '../store/designStore'
import ColorPicker from './ColorPicker'

export default function Catalog() {
  const [selectedColor, setSelectedColor] = useState('#8B4513')
  const addFurnitureItem = useDesignStore(state => state.addFurnitureItem)

  const handleAddFurniture = (catalogItem) => {
    const newItem = {
      ...catalogItem,
      x: Math.random() * 200,
      y: Math.random() * 200,
      color: selectedColor,
      rotation: 0,
      id: Date.now()
    }
    addFurnitureItem(newItem)
  }

  return (
    <div className="catalog">
      <h2>📦 Mobilya Kataloğu</h2>
      
      <div className="color-section">
        <h3>🎨 Renk Seçimi</h3>
        <ColorPicker 
          colors={COLORS}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
      </div>

      <div className="furniture-list">
        <h3>Mobilyalar</h3>
        {FURNITURE_CATALOG.map(item => (
          <div 
            key={item.id} 
            className="furniture-card"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'copy'
              e.dataTransfer.setData('furniture', JSON.stringify({
                ...item,
                color: selectedColor
              }))
            }}
          >
            <div className="furniture-icon">{item.icon}</div>
            <div className="furniture-info">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <div className="furniture-dims">
                <small>📏 {item.width}×{item.depth}×{item.height} cm</small>
              </div>
            </div>
            <button 
              className="add-btn"
              onClick={() => handleAddFurniture(item)}
              title="Tıkla veya sürükle"
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}