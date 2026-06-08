import { create } from 'zustand'

export const useDesignStore = create((set) => ({
  furnitureItems: [],
  selectedItem: null,
  hoveredItem: null,
  draggedItem: null,

  addFurnitureItem: (item) => set((state) => ({
    furnitureItems: [...state.furnitureItems, { ...item, id: Date.now() }]
  })),

  removeFurnitureItem: (id) => set((state) => ({
    furnitureItems: state.furnitureItems.filter(item => item.id !== id)
  })),

  selectItem: (id) => set((state) => ({
    selectedItem: state.furnitureItems.find(item => item.id === id) || null
  })),

  updateFurnitureItem: (id, updates) => set((state) => ({
    furnitureItems: state.furnitureItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ),
    selectedItem: state.selectedItem?.id === id 
      ? { ...state.selectedItem, ...updates }
      : state.selectedItem
  })),

  setHoveredItem: (id) => set({ hoveredItem: id }),

  setDraggedItem: (id) => set({ draggedItem: id }),

  clearDesign: () => set({
    furnitureItems: [],
    selectedItem: null
  })
}))