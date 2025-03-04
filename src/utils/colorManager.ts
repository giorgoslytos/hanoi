const generateColors = (size: number) => {
  const colors = [
    '#FF0000',
    '#FFA500',
    '#FFD700',
    '#008000',
    '#00CED1',
    '#0000FF',
    '#800080',
    '#FF69B4',
  ]
  return iterateColors(size, [...colors])
}

const iterateColors = (
  size: number,
  arr: string[],
): { [x: string]: string } => {
  //   console.log({ size, arr })
  if (size == 0) return {}
  else {
    Math.ceil((Math.random() * size) % size)
    return {
      [size]: arr.pop(),
      ...iterateColors(size - 1, arr),
    }
  }
}

export default generateColors
