import React, { Component } from 'react'
import { Grid, Button, Loader } from 'semantic-ui-react';

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
    loadingInitial: true,
    loadedEvents: []
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

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
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

  render() {
    const {loading} = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />

    return (
     <Grid>
        <Grid.Column width={10}>
          <EventList loading={loading} moreEvents={moreEvents}
            events={loadedEvents} getNextEvents={this.getNextEvents} />
          {/* <Button onClick={this.getNextEvents} disbled={!this.state.moreEvents} 
              loading={loading} content='More' color='green' floated='right' /> */}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
     </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
    firestoreConnect([{ collection: 'events' }]) (EventDashboard)
    );
