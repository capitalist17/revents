import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const eventDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin leo.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28T14:00:00+00:00',
    category: 'drinks',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus soitudin ligula.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]

class EventDashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      events : eventDashboard,
      isOpen : false
    }

    // Not the preferred way to bind
    // this.handleFormOpen = this.handleFormOpen.bind(this);
    // this.handleCancel = this.handleCancel.bind(this); 
  }

  // handleFormOpen(){
  //   this.setState({isOpen : true});
  // }

  // This is the preferred way to bind the handler method, instead of doing it in the constructor
  handleFormOpen = (thing) => ()  => {
    console.log(thing); // This has no bearing to the logic. Just to illustrate passing params 
    this.setState({isOpen : true});
  }

  // handleCancel(){
  //   this.setState({isOpen : false});
  // }

  handleCancel = () => {
    this.setState({isOpen : false});
  }
  render() {
    return (
     <Grid>
         <Grid.Column width={10}> 
            <EventList events = {this.state.events}/>
         </Grid.Column>
         <Grid.Column width={6}> 
            <Button positive content="Create Event" onClick={this.handleFormOpen("Pass something")}/>
            {this.state.isOpen && <EventForm handleCancel={this.handleCancel}/>}            
         </Grid.Column>
     </Grid>
    )
  }
}

export default EventDashboard