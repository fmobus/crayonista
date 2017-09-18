const snap = value => parseFloat(value.toFixed(2));
const pairs = arr => arr.slice(0, arr.length - 1).map((el, idx) => [el, arr[idx + 1]]);

export class Point {
  constructor(x, y, scale = 1) {
    this.x = 0 + x * scale;
    this.y = 0 + y * scale;
  }
  sub(other) {
    return new Point(this.x - other.x, this.y - other.y);
  }
  add(other) {
    return new Point(this.x + other.x, this.y + other.y);
  }
  snap() {
    return new Point(snap(this.x), snap(this.y));
  }
}

export class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.mag = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  }
  magnitude() {
    return this.mag;
  }
  intersect(other) {
    const { x: x1, y: y1 } = this.p1;
    const { x: x2, y: y2 } = this.p2;
    const { x: x3, y: y3 } = other.p1;
    const { x: x4, y: y4 } = other.p2;

    const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
          ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
          ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    if (isNaN(x) || isNaN(y)) {
      return false;
    }
    return new Point(x, y);
  }
  buffer(delta) {
    const vector = this.p2.sub(this.p1);
    const prime = new Point(vector.y, -vector.x, delta / this.mag);
    return new Segment(prime.add(this.p1).snap(), prime.add(this.p2).snap());
  }
}

export class Line {
  constructor(...points) {
    this.segments = pairs(points).map(([p1, p2]) => new Segment(p1, p2));
  }
  buffer(delta) {
    const buffers = this.segments.map(s => s.buffer(delta));
    const intersects = pairs(buffers).map(([s1, s2]) => s1.intersect(s2));
    const firstPoint = buffers[0].p1;
    const lastPoint = buffers[buffers.length - 1].p2;
    return [firstPoint, ...intersects, lastPoint].map(p => p.snap());
  }
}

export const buffer = (points, delta) => {
  const line = new Line(...points.map(({x, y}) => new Point(x, y)));
  return line.buffer(delta);
};
