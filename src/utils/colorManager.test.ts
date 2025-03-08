import generateColors from './colorManager'

describe('colorManager function', () => {
  test('should return an empty object when size is 0', () => {
    expect(generateColors(0)).toEqual({})
  })

  test('should return an object with a single key-value pair', () => {
    const result = generateColors(1)
    expect(typeof result).toBe('object')
    expect(Object.keys(result)).toHaveLength(1)
  })

  test('should return an object where the key is the input size', () => {
    const size = 5
    const result = generateColors(size)
    expect(result).toHaveProperty(size.toString())
  })

  test('should return a valid color from the predefined colors array', () => {
    const size = 4
    const result = generateColors(size)
    const extractedColor = result?.[size]
    const validColors = [
      '#FF0000',
      '#FFA500',
      '#FFD700',
      '#008000',
      '#00CED1',
      '#0000FF',
      '#800080',
      '#FF69B4',
    ]
    expect(validColors).toContain(extractedColor)
  })

  test('should return different colors on successive calls (most of the time)', () => {
    const size = 6
    const result1 = generateColors(size)
    const result2 = generateColors(size)
    expect(result1).not.toEqual(result2)
  })
})
