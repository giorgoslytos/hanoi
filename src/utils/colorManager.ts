const colors = [
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FF4500', // Neon Orange
  '#7FFF00', // Electric Green
  '#8A2BE2', // Electric Purple
  '#FFD700', // Bright Gold
  '#FFB6C1', // Light Pink
  '#FFDAB9', // Peach
  '#B0E0E6', // Powder Blue
  '#98FB98', // Pale Green
  '#E6E6FA', // Lavender
  '#FFFACD', // Lemon Chiffon
  '#FF0000',
  '#FFA500',
  '#008000',
  '#00CED1',
  '#0000FF',
  '#800080',
  '#FF69B4',
  '#C0C0C0', // Silver
  '#B87333', // Copper
  '#708090', // Slate Gray
  '#4682B4', // Steel Blue
]

const generateColors = (length: number = 10) => {
  return iterateColors(length, [...colors])
}

const iterateArray = (index: number, arr: (string | null)[]): string => {
  const result = arr[index]
  if (result) {
    arr[index] = null
    return result
  }
  return iterateArray(index + 1, arr)
}

const iterateColors = (
  length: number,
  arr: (string | null)[],
): { [x: string]: string } => {
  if (length === 0) return {}
  else {
    const index = Math.floor(Math.random() * 10)
    const color = iterateArray(index, arr)
    return {
      [length]: color,
      ...iterateColors(length - 1, arr),
    }
  }
}

export default generateColors
