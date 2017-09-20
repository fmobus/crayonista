import {} from '../actions/const';

const initialState = [];

const copy = (input, selectFn, transformFn) => {
  const identity = x => x;
  return input.map((entry, idx) => {
    const isSelected = selectFn(entry, idx);
    const fn = (isSelected) ? transformFn : identity;
    return fn(entry, idx);
  });
};

function roundish(value, precision) {
  console.assert(precision >  0, "precision cannot be zero");
  console.assert(precision <= 1, "precision must be smaller than 1")
  const factor = 1 / precision;
  console.assert(factor == Math.round(factor), "precision must be a fractional part of unit");
  return Math.round(value * factor) / factor;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'POINT_SELECTED': {
      const transform = point => ({ ...point, selected: true });
      return copy(state, e => e.id === action.id, transform);
    }
    case 'POINT_DESELECTED': {
      const transform = point => ({ ...point, selected: false });
      return copy(state, e => e.selected, transform);
    }
    case 'POINT_MOVED': {
      const transform = (point) => {
        const nx = point.x + roundish(action.dx, 0.5);
        const ny = point.y + roundish(action.dy, 0.5);
        const x = (action.snap) ? roundish(nx, 1) : nx;
        const y = (action.snap) ? roundish(ny, 1) : ny;
        return { ...point, x, y };
      };
      return copy(state, e => e.id === action.id, transform);
    }
    case 'POINT_REMOVE_BIND': {
      const transform = (point) => {
        const others = point.bound.filter(p => p !== action.target);
        return { ...point, bound: others };
      };
      return copy(state, e => e.id === action.id, transform);
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
