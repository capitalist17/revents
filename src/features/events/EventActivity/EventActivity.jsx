import React from 'react';
import { Segment,  Header } from 'semantic-ui-react';

const EventActivity = () => {
  return (
    <div>
      <Header attached='top' content='Recent Activity'/>
      <Segment attached>
        <p>Recent Activity</p>
      </Segment>
    </div>
  )
}

export default EventActivity
