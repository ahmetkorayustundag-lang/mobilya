import React, { useState } from 'react'
import Canvas2D from './components/Canvas2D'
import Canvas3D from './components/Canvas3D'
import Toolbar from './components/Toolbar'
import Catalog from './components/Catalog'
import { useDesignStore } from './store/designStore'

export default function App() {
  const [view, setView] = useState('2d') // '2d' or '3d'
  const [showCatalog, setShowCatalog] = useState(true)
  const furnitureItems = useDesignStore(state => state.furnitureItems)
  const selectedItem = useDesignStore(state => state.selectedItem)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🛋️ Mobilya Tasarım Sistemi</h1>
        <div className="header-controls">
          <button 
            className={`view-btn ${view === '2d' ? 'active' : ''}`}
            onClick={() => setView('2d')}
          >
            2D Tasarım
          </button>
          <button 
            className={`view-btn ${view === '3d' ? 'active' : ''}`}
            onClick={() => setView('3d')}
          >
            3D Model
          </button>
          <button 
            className="catalog-btn"
            onClick={() => setShowCatalog(!showCatalog)}
          >
            {showCatalog ? '🙈 Kataloğu Gizle' : '👁️ Kataloğu Göster'}
          </button>
        </div>
      </header>

      <div className="main-content">
        <aside className={`sidebar ${showCatalog ? 'visible' : 'hidden'}`}>
          <Catalog />
        </aside>

        <div className="canvas-container">
          <Toolbar />
          {view === '2d' ? <Canvas2D /> : <Canvas3D />}
        </div>

        <aside className="properties-panel">
          <h3>Özellikler</h3>
          {selectedItem ? (
            <div className="properties-content">
              <div className="prop-group">
                <label>Ad: <span>{selectedItem.name}</span></label>
              </div>
              <div className="prop-group">
                <label>Tür: <span>{selectedItem.type}</span></label>
              </div>
              <div className="prop-group">
                <label>En: <span>{selectedItem.width} cm</span></label>
              </div>
              <div className="prop-group">
                <label>Yü: <span>{selectedItem.height} cm</span></label>
              </div>
              <div className="prop-group">
                <label>Der: <span>{selectedItem.depth} cm</span></label>
              </div>
              <div className="prop-group">
                <label>Renk: 
                  <input 
                    type="color" 
                    value={selectedItem.color}
                    disabled
                  />
                </label>
              </div>
            </div>
          ) : (
            <p className="no-selection">Bir mobilya seçiniz</p>
          )}
        </aside>
      </div>
    </div>
  )
}