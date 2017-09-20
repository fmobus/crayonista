import {} from '../actions/const';

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'POINT_SELECTED': {
      const selectedIndex = state.findIndex(e => e.id === action.id);
      if (selectedIndex < 0) { return state; }
      const newPoint = { ...state[selectedIndex], selected: true };
      return [
        ...state.slice(0, selectedIndex),
        newPoint,
        ...state.slice(selectedIndex + 1, state.length)
      ];
    }
    case 'POINT_DESELECTED': {
      const selectedIndex = state.findIndex(e => e.selected);
      if (selectedIndex < 0) { return state; }
      const newPoint = { ...state[selectedIndex], selected: false };
      return [
        ...state.slice(0, selectedIndex),
        newPoint,
        ...state.slice(selectedIndex + 1, state.length)
      ];
    }
    case 'POINT_MOVED': {
      const selectedIndex = state.findIndex(e => e.id === action.id);
      if (selectedIndex < 0) { return state; }
      const point = state[selectedIndex];
      const nx = point.x + Math.round(action.dx);
      const ny = point.y + Math.round(action.dy);
      const x = (action.snap) ? Math.round(nx) : nx;
      const y = (action.snap) ? Math.round(ny) : ny;
      const newPoint = { ...point, x, y };
      return [
        ...state.slice(0, selectedIndex),
        newPoint,
        ...state.slice(selectedIndex + 1, state.length)
      ];
    }
    case 'POINT_REMOVE_BIND': {
      const selectedIndex = state.findIndex(e => e.id === action.id);
      if (selectedIndex < 0) { return state; }
      const point = state[selectedIndex];
      const others = point.bound.filter(p => p !== action.target);
      const newPoint = { ...point, bound: others };
      return [
        ...state.slice(0, selectedIndex),
        newPoint,
        ...state.slice(selectedIndex + 1, state.length)
      ];
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
