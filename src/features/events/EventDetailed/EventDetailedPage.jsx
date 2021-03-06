import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirestore, firebaseConnect, isEmpty  } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray, createDataTree } from '../../../app/common/util/helpers';

import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';
import { openModal } from '../../modals/modalActions';
import LoadingComponent from '../../../app/layout/LoadingComponent'

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
    requesting: state.firestore.status.requesting,
    event: event,
    loading: state.async.loading,
    auth: state.firebase.auth,
    eventChat: !isEmpty(state.firebase.data.event_chat) &&
          objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  };
} 

const mapDispatchToProps = {
  goingToEvent, cancelGoingToEvent, addEventComment, openModal
}

class EventDetailedPage extends Component {
  state = {
    initialLoading: true
  }

  async componentDidMount(){
    const {firestore, match} = this.props;
    
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      toastr.error('Not found', 'This is not the event you are looking for')
      this.props.history.push('/error')
    }
    await firestore.setListener(`events/${match.params.id}`);
    this.setState({
      initialLoading: false
    })
  }

  async componentWillUnmount(){
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {event,auth,goingToEvent,cancelGoingToEvent,addEventComment,
          eventChat,loading, openModal, requesting, match } = this.props;
    const attendees =  event && event.attendees 
                      && objectToArray(event.attendees).sort(function(a,b){ 
                                                                return a.joinDate - b.joinDate;
                                                              });
    const isHost = event.hostUid === auth.uid;
    /* The some() method executes the function once for each element present in the array:
       If it finds an array element where the function returns a true value, some() returns true 
       (and does not check the remaining values) Otherwise it returns false. */
    const isGoing = attendees && attendees.some(attendee => attendee.id === auth.uid)
    // create a hierarchical data structure using createDataTree
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat) 
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingEvent = requesting[`events/${match.params.id}`]  

    if (loadingEvent || this.state.initialLoading) return <LoadingComponent inverted={true}/>

    return (
      <Grid>
        <Grid.Column width={10}>        
          <EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} loading = {loading}
                              goingToEvent={goingToEvent} cancelGoingToEvent= {cancelGoingToEvent}
                              authenticated= {authenticated} openModal={openModal} /> 
          <EventDetailedInfo event={event} /> 
          { authenticated && 
          <EventDetailedChat eventChat={chatTree} addEventComment={addEventComment} eventId={event.id}/> 
          }
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
  // check if the user is authenticated
  firebaseConnect(props => [`event_chat/${props.match.params.id}`]) //depends on props.see in browser inspect
)(EventDetailedPage);

