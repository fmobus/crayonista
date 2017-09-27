import { angle, angles } from './angles'

describe('angle from three points', () => {
  describe('right isosceles triangle at origin', () => {
    const p0 = { x: 0, y: 0 }
    const p1 = { x: 0, y: 5 }
    const p2 = { x: 5, y: 0 }

    it('has 90º at origin', () => {
      expect(angle(p1, p0, p2)).toEqual(90)
      expect(angle(p2, p0, p1)).toEqual(90)
    })

    it('has 45º at the other two points', () => {
      expect(angle(p0, p1, p2)).toEqual(45)
      expect(angle(p2, p1, p0)).toEqual(45)

      expect(angle(p1, p2, p0)).toEqual(45)
      expect(angle(p0, p2, p1)).toEqual(45)
    })
  })

  describe('obtuse isosceles triangle at origin', () => {
    const p0 = { x: 0, y: 0 }
    const p1 = { x: 0, y: 5 }
    const p2 = { x: 3.5355, y: 8.5355 }

    it('has 22.5º at origin and at far point', () => {
      expect(angle(p1, p0, p2)).toBeCloseTo(22.5, 2)
      expect(angle(p2, p0, p1)).toBeCloseTo(22.5, 2)
      expect(angle(p1, p2, p0)).toBeCloseTo(22.5, 2)
      expect(angle(p0, p2, p1)).toBeCloseTo(22.5, 2)
    })

    it('has 135º at center point', () => {
      expect(angle(p0, p1, p2)).toEqual(135)
      expect(angle(p2, p1, p0)).toEqual(135)
    })
  })

  describe('equilateral triangle at origin', () => {
    const p0 = { x: 0, y: 0 }
    const p1 = { x: 6, y: 0 }
    const p2 = { x: 3, y: 5.197 }

    it('has 60º at all points', () => {
      expect(angle(p1, p0, p2)).toBeCloseTo(60, 2)
      expect(angle(p2, p0, p1)).toBeCloseTo(60, 2)
      expect(angle(p0, p1, p2)).toBeCloseTo(60, 2)
      expect(angle(p2, p1, p0)).toBeCloseTo(60, 2)
      expect(angle(p1, p2, p2)).toBeCloseTo(60, 2)
      expect(angle(p2, p1, p0)).toBeCloseTo(60, 2)
    })
  })
})

describe('angle list for a sequence of points', () => {
  const p0 = { x: 0, y: 0 }
  const p1 = { x: 0, y: 5 }
  const p2 = { x: 5, y: 10 }
  const p3 = { x: 10, y: 5 }
  const p4 = { x: 10, y: 10 }

  it('has null angles at both ends', () => {
    const result = angles(p0, p1, p2, p3, p4)
    expect(result.length).toEqual(5)
    expect(result[0]).toEqual(null)
    expect(result[4]).toEqual(null)
  })

  it('inner angles are 135º, 90º and 45º respectively', () => {
    const result = angles(p0, p1, p2, p3, p4)
    expect(result[1]).toBe(135)
    expect(result[2]).toBe(90)
    expect(result[3]).toBe(45)
  })
})
