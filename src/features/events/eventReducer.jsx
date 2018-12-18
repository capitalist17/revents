import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants';

const initialState = [
    {
      id: '1',
      title: 'Trip to Tower of London',
      date: '2018-03-27',
      category: 'culture',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin leo.',
      city: 'London, UK',
      venue: "Tower of London, St Katharine's & Wapping, London",
      hostedBy: 'Bob',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        }
      ]
    },
    {
      id: '2',
      title: 'Trip to Punch and Judy Pub',
      date: '2018-03-28',
      category: 'drinks',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus soitudin ligula.',
      city: 'London, UK',
      venue: 'Punch & Judy, Henrietta Street, London, UK',
      hostedBy: 'Tom',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      attendees: [
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        }
      ]
    }
  ]

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