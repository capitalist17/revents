import React, { Component } from 'react'
import { Grid, Loader } from 'semantic-ui-react';

import EventList from '../EventList/EventList';

import { connect } from 'react-redux'; // using this we can bind this component to the redux store
import { firestoreConnect} from 'react-redux-firebase'; // Binding to connecto to firebase firestore

import { getEventsForDashboard } from '../eventActions';

import EventActivity from '../EventActivity/EventActivity'
import LoadingComponent from '../../../app/layout/LoadingComponent';

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5
  }
]

const mapStateToProps = (state) => ({
  events: state.events,
  //events: state.firestore.ordered.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
})

const mapDispatchToProps = {
  getEventsForDashboard
}

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {}
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

  handleContextRef = contextRef => this.setState({contextRef})

  render() {
    const {loading, activities} = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />

    return (
     <Grid>
        <Grid.Column width={10}>
          <div ref={this.handleContextRef}>
            <EventList loading={loading} moreEvents={moreEvents}
              events={loadedEvents} getNextEvents={this.getNextEvents} />
            {/* <Button onClick={this.getNextEvents} disbled={!this.state.moreEvents} 
                loading={loading} content='More' color='green' floated='right' /> */}
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity activities={activities} contextRef={this.state.contextRef}/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
     </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
    firestoreConnect(query) (EventDashboard)
    );
