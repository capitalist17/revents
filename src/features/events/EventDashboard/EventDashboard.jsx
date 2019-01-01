import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';

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
  state = {
    moreEvents: false,
    loadingInitial: true
  };

  async componentDidMount(){
    // next will contain the querySnap returned from eventAction (getEventsForDashboard)
    let next = await this.props.getEventsForDashboard();

    console.log(next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  }

  render() {
    const {events, loading} = this.props;
    if (loading) return <LoadingComponent inverted={true} />

    return (
     <Grid>
         <Grid.Column width={10}> 
            <EventList deleteEvent={this.handleDeleteEvent} events = {events}/>
            <Button onClick={this.getNextEvents} disbled={!this.state.moreEvents}
              content='More' color='green' floated='right' />
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
