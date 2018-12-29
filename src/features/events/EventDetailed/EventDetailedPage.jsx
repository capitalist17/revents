import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};
  let events = state.firestore.ordered.events;
  
  if (eventId && events.length > 0) {
    // The filter function returns an Array. Here even if its a single event, we have 
    // to use the array subscript syntax to fetch the required event object
    event = events.filter( event => event.id === eventId)[0];
  }
  /*
  if (eventId && state.events.length > 0) {
    // The filter function returns an Array. Here even if its a single event, we have 
    // to use the array subscript syntax to fetch the required event object
    event = state.events.filter( event => event.id === eventId)[0];
  }
  */
  return {event};
} 

class EventDetailedPage extends Component {
  async componentDidMount(){
    const {firestore, match} = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    console.log(event);
  }
  render() {
    const {event} = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>        
          <EventDetailedHeader event={event} /> 
          <EventDetailedInfo event={event} /> 
          <EventDetailedChat /> 
        </Grid.Column>

        <Grid.Column width={6}>
          {/* <EventDetailedSidebar attendees={event.attendees} /> */}
        </Grid.Column>
      </Grid>
    )
  }
}


export default withFirestore(connect(mapStateToProps)(EventDetailedPage))
