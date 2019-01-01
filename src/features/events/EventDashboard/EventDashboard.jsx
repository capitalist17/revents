import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';

import EventList from '../EventList/EventList';

import { connect } from 'react-redux'; // using this we can bind this component to the redux store
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'; // Binding to connecto to firebase firestore

import { deleteEvent, getEventsForDashboard } from '../eventActions';

import EventActivity from '../EventActivity/EventActivity'
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapStateToProps = (state) => ({
  events: state.events,
  //events: state.firestore.ordered.events,
  loading: state.async.loading
})

const mapDispatchToProps = {
  deleteEvent, getEventsForDashboard
}

class EventDashboard extends Component {
  componentDidMount(){
    this.props.getEventsForDashboard();
  }

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  }

  render() {
    const {events, loading} = this.props;
    if (loading) return <LoadingComponent inverted={true} />

    return (
     <Grid>
         <Grid.Column width={10}> 
            <EventList deleteEvent={this.handleDeleteEvent} 
                       events = {events}/>
         </Grid.Column>
         <Grid.Column width={6}> 
            <EventActivity />
         </Grid.Column>
     </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
    firestoreConnect([{ collection: 'events' }]) (EventDashboard)
    );
