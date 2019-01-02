import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirestore, firebaseConnect, isEmpty  } from 'react-redux-firebase';

import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray } from '../../../app/common/util/helpers';

import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';

const mapStateToProps = (state, ownProps) => {
  //const eventId=ownProps.match.params.id
  let event = {};
  
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }
  /*
  if (eventId && state.events.length > 0) {
    // The filter function returns an Array. Here even if its a single event, we have 
    // to use the array subscript syntax to fetch the required event object
    event = state.events.filter( event => event.id === eventId)[0];
  }
  */
  return {
    event: event,
    auth: state.firebase.auth
  };
} 

const mapDispatchToProps = {
  goingToEvent, cancelGoingToEvent, addEventComment
}

class EventDetailedPage extends Component {
 
  async componentDidMount(){
    const {firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount(){
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {event, auth, goingToEvent, cancelGoingToEvent, addEventComment } = this.props;
    const attendees =  event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    /* The some() method executes the function once for each element present in the array:
       If it finds an array element where the function returns a true value, some() returns true 
       (and does not check the remaining values) Otherwise it returns false. */
    const isGoing = attendees && attendees.some(attendee => attendee.id === auth.uid)

    return (
      <Grid>
        <Grid.Column width={10}>        
          <EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} 
                              goingToEvent={goingToEvent} cancelGoingToEvent= {cancelGoingToEvent}/> 
          <EventDetailedInfo event={event} /> 
          <EventDetailedChat addEventComment={addEventComment} eventId={event.id}/> 
        </Grid.Column>

        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    )
  }
}


// export default withFirestore(connect(mapStateToProps,mapDispatchToProps)(EventDetailedPage))
export default compose(
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`]) //depends on props.see in browser inspect
)(EventDetailedPage);

