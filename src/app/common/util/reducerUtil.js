export const createReducer = (initialState, functionMap) => {
    return (state = initialState, {type, payload}) => {
      const handler = functionMap[type];
  
      return handler ? handler(state, payload): state
    }
  }