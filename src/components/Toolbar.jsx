import React from 'react'
import { useDesignStore } from '../store/designStore'

export default function Toolbar() {
  const clearDesign = useDesignStore(state => state.clearDesign)
  const furnitureItems = useDesignStore(state => state.furnitureItems)

  const handleExport = () => {
    const data = {
      items: furnitureItems,
      exportedAt: new Date().toISOString()
    }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mobilya-tasarimi-${Date.now()}.json`
    a.click()
  }

  const handleClear = () => {
    if (window.confirm('Tüm tasarımı temizlemek istediğinize emin misiniz?')) {
      clearDesign()
    }
  }

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={handleExport} title="JSON'a Dışa Aktar">
          💾 Dışa Aktar
        </button>
        <button className="toolbar-btn danger" onClick={handleClear} title="Temizle">
          🗑️ Temizle
        </button>
      </div>
      <div className="toolbar-info">
        <span>📊 Toplam Mobilya: <strong>{furnitureItems.length}</strong></span>
      </div>
    </div>
  )
}