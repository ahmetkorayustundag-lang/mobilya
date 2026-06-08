import React from 'react'

export default function ColorPicker({ colors, selectedColor, onColorChange }) {
  return (
    <div className="color-picker">
      {colors.map(color => (
        <button
          key={color}
          className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
          title={color}
        >
          {selectedColor === color && '✓'}
        </button>
      ))}
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => onColorChange(e.target.value)}
        className="custom-color-input"
        title="Özel Renk"
      />
    </div>
  )
}