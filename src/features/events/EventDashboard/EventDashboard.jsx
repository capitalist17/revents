import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import cuid from 'cuid'; // generates random unique ids 
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { connect } from 'react-redux'; // using this we can bind this component to the redux store

const mapStateToProps = (state) => ({
  events: state.events
})

class EventDashboard extends Component {

  state = {
    isOpen : false,
    selectedEvent: null
  }

  // This is the preferred way to bind the handler method, instead of doing it in the constructor
  handleFormOpen = ()  => {
    this.setState({
      selectedEvent: null,
      isOpen : true
    });
  }

  handleCancel = () => {
    this.setState({isOpen : false});
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL='/assets/user.png';
    // ... is the spread operator. It basically expands the existing array and adds the new element to the array
    const updatedEvents = [...this.state.events, newEvent];
    this.setState({
      events: updatedEvents,
      isOpen: false,
      selectedEvent: newEvent
    })
  }

  handleUpdateEvent = (updatedEvent) => {
    this.setState({
      events:this.state.events.map((event) => {
              if(event.id === updatedEvent.id){
                // We first set the existing object to null and then assign the updatedEvent. 
                // As good as saying that we are replacing the existing event with the updatedEvent.
                return Object.assign({}, updatedEvent); 
              } else {
                return event;
              }
            }),
      isOpen: false,
      selectedEvent:null
    })
  }
  // This syntax is known as currying and is used to defin higher order functions.
  // Higher order functions return functions.
  handleOpenEvent = (eventToOpen) => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen:true
    })
  }

  handleDeleteEvent = (eventId) => () => {
    const updatedEvents = this.state.events.filter(e => e.id !== eventId);
    
    this.setState({
      events : updatedEvents,
      selectedEvent:null
    })
  }

  render() {
    const {selectedEvent} = this.state;
    const {events} = this.props;
    return (
     <Grid>
         <Grid.Column width={10}> 
            <EventList deleteEvent={this.handleDeleteEvent} 
                       onEventOpen={this.handleOpenEvent} 
                       events = {events}/>
         </Grid.Column>
         <Grid.Column width={6}> 
            <Button positive content="Create Event" onClick={this.handleFormOpen}/>
            {this.state.isOpen && 
            <EventForm selectedEvent={selectedEvent} 
                       createEvent={this.handleCreateEvent} 
                       updateEvent={this.handleUpdateEvent}
                       handleCancel={this.handleCancel}/>}            
         </Grid.Column>
     </Grid>
    )
  }
}

export default connect(mapStateToProps)(EventDashboard);