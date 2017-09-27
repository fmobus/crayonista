const normalize = (angle) => {
  let residue = (angle + 360) % 360
  if (residue > 180) { residue -= 360 }
  return Math.abs(residue)
}
const toDegrees = radians => radians * (180 / Math.PI)

const angle = (p0, p1, p2) => {
  const v1 = Math.atan2(p0.y - p1.y, p0.x - p1.x)
  const v2 = Math.atan2(p2.y - p1.y, p2.x - p1.x)
  return normalize(toDegrees(v1 - v2))
}

const angles = (...points) => {
  const middlePoints = points.slice(1, points.length - 1)
  const angles = middlePoints.map((point, idx) => {
    const previous = points[idx]
    const next = points[idx+2]
    return angle(previous, point, next)
  })
  return [null, ...angles, null]
}

export { angle, angles }
