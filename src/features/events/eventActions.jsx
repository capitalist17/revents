import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants';

export const createEvent = (event) => {
    return {
      type: CREATE_EVENT,
      payload: {
        event
      }
    }
  }
  
  export const updateEvent = (event) => {
    return {
      type: UPDATE_EVENT,
      payload: {
        event
      }
    }
  }
  
  // for deletion the payload is the id of the event
  export const deleteEvent = (eventId) => {
    return {
      type: DELETE_EVENT,
      payload: {
        eventId
      }
    }
  }