import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants';

 const initialState = [];

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_EVENT:
        return [...state, Object.assign({}, action.payload.event)];
      case UPDATE_EVENT:
        return [...state.filter(event => event.id !== action.payload.event.id )
                , Object.assign({}, action.payload.event)];
      case DELETE_EVENT:
        return [...state.filter(event => event.id !== action.payload.eventId)]
      default:
        return state;
    }
  };
  
  export default eventReducer;