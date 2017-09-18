import { Segment, Point, Line, buffer } from '../../src/libs/geometry';

describe('Segment', () => {
  const p1 = new Point(0, 0);
  const p2 = new Point(3, 4);
  const p3 = new Point(0, 4);
  const p4 = new Point(3, 0);

  it('has magnitude', () => {
    const segment = new Segment(p1, p2);
    expect(segment.magnitude()).to.eql(5);
  });

  it('intersects with another segment', () => {
    const s1 = new Segment(p1, p2);
    const s2 = new Segment(p3, p4);
    const result = s1.intersect(s2);
    expect(result.x).to.eql(1.5);
    expect(result.y).to.eql(2);
  });

  describe('buffer', () => {
    const parallelToX = new Segment(p1, p4);
    const paralellToY = new Segment(p1, p3);
    const diagonal1 = new Segment(p1, p2);
    const diagonal2 = new Segment(p4, p3);

    it('buffer for segments parallels to X', () => {
      const result = parallelToX.buffer(1);
      expect(result.p1).to.contain({ x: 0, y: -1 });
      expect(result.p2).to.contain({ x: 3, y: -1 });
    });
    it('buffer for segments parallels to Y', () => {
      const result = paralellToY.buffer(1);
      expect(result.p1).to.contain({ x: 1, y: 0 });
      expect(result.p2).to.contain({ x: 1, y: 4 });
    });
    it('buffer for diagonal segment', () => {
      const result = diagonal1.buffer(1);
      expect(result.p1).to.contain({ x: 0.8, y: -0.6 });
      expect(result.p2).to.contain({ x: 3.8, y: 3.4 });
    });
    it('buffer for diagonal segment', () => {
      const result = diagonal2.buffer(1);
      expect(result.p1).to.contain({ x: 3.8, y: 0.6 });
      expect(result.p2).to.contain({ x: 0.8, y: 4.6 });
    });
  });

  describe('line', () => {
    const line = new Line(p1, p4, p3, p2);

    it('builds segments for ordered points', () => {
      expect(line.segments.length).to.eql(3);
      expect(line.segments[0].p1).to.eql(p1);
      expect(line.segments[0].p2).to.eql(p4);
      expect(line.segments[1].p1).to.eql(p4);
      expect(line.segments[1].p2).to.eql(p3);
      expect(line.segments[2].p1).to.eql(p3);
      expect(line.segments[2].p2).to.eql(p2);
    });

    it('calculates buffer for line', () => {
      const result = line.buffer(1);
      expect(result[0]).to.contain({ x: 0, y: -1 });
      expect(result[1]).to.contain({ x: 5, y: -1 });
      expect(result[2]).to.contain({ x: 2, y: 3 });
      expect(result[3]).to.contain({ x: 3, y: 3 });
    });

    it('calculates buffer for line', () => {
      const result = line.buffer(-1);
      expect(result[0]).to.contain({ x: 0, y: 1 });
      expect(result[1]).to.contain({ x: 1, y: 1 });
      expect(result[2]).to.contain({ x: -2, y: 5 });
      expect(result[3]).to.contain({ x: 3, y: 5 });
    });
  });

  describe('buffer', () => {
    it('calculates a buffer for a sequence of points', () => {
      const points = [{x: 0, y: 0}, {x: 3, y: 0}, {x: 0, y: 4}, {x: 3, y: 4}];
      const result = buffer(points, 1);
      expect(result[0]).to.contain({ x: 0, y: -1 });
      expect(result[1]).to.contain({ x: 5, y: -1 });
      expect(result[2]).to.contain({ x: 2, y: 3 });
      expect(result[3]).to.contain({ x: 3, y: 3 });
    });
  });
});
