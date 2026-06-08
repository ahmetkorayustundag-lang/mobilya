export const FURNITURE_CATALOG = [
  {
    id: 'sofa-1',
    name: 'Klasik Kanepe',
    type: 'Kanepe',
    width: 200,
    height: 85,
    depth: 90,
    color: '#8B4513',
    icon: '🛋️',
    description: 'Konforlu 3 kişilik kanepe'
  },
  {
    id: 'chair-1',
    name: 'Sandalye',
    type: 'Sandalye',
    width: 60,
    height: 85,
    depth: 60,
    color: '#D2691E',
    icon: '🪑',
    description: 'Ahşap Sandalye'
  },
  {
    id: 'table-1',
    name: 'Kahvaltı Masası',
    type: 'Masa',
    width: 100,
    height: 45,
    depth: 60,
    color: '#654321',
    icon: '📦',
    description: 'Oturma Odası Masası'
  },
  {
    id: 'bed-1',
    name: 'Çift Kişilik Yatak',
    type: 'Yatak',
    width: 160,
    height: 100,
    depth: 200,
    color: '#8B7355',
    icon: '🛏️',
    description: '160x200 yatak'
  },
  {
    id: 'shelf-1',
    name: 'Kitaplık',
    type: 'Raf',
    width: 120,
    height: 200,
    depth: 30,
    color: '#704214',
    icon: '📚',
    description: 'Duvar Kitaplığı'
  },
  {
    id: 'wardrobe-1',
    name: 'Gardırop',
    type: 'Dolap',
    width: 100,
    height: 200,
    depth: 60,
    color: '#5D4E37',
    icon: '🚪',
    description: 'Giysi Dolabı'
  },
  {
    id: 'nightstand-1',
    name: 'Gece Komodinası',
    type: 'Komodin',
    width: 50,
    height: 60,
    depth: 40,
    color: '#8B6914',
    icon: '📫',
    description: 'Yatak Odası Komodinası'
  },
  {
    id: 'desk-1',
    name: 'Çalışma Masası',
    type: 'Masa',
    width: 120,
    height: 75,
    depth: 60,
    color: '#696969',
    icon: '💼',
    description: 'Bilgisayar Masası'
  }
]

export const COLORS = [
  '#8B4513',
  '#D2691E',
  '#8B6914',
  '#654321',
  '#696969',
  '#C0C0C0',
  '#000000',
  '#FFFFFF',
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA502',
]

export const calculateArea = (width, depth) => {
  return (width * depth) / 10000
}

export const calculateVolume = (width, height, depth) => {
  return (width * height * depth) / 1000000
}

export const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}