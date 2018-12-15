import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
class App extends Component {
  render() {
    return (
      <div>
        <h1>Re-vents</h1>
        <EventDashboard/>
      </div>
    );
  }
}

export default App;
