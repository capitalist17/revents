import React, { Component } from 'react'
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const {events, onEventEdit} = this.props;
    return (
      

      <div>
          <h1>Event List</h1>
          {events.map((event) => { 
                        return <EventListItem key={event.id} event={event} onEventEdit={onEventEdit} /> ;
                      })}

          {/* The line below is the short form of the above arrow function 
          {events.map((event) => ( <EventListItem key={event.id} event={event} /> ) )}
          */}
      </div>
    )
  }
}

export default EventList;