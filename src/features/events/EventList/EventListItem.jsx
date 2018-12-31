import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const {event, deleteEvent} = this.props;   
    return (
        <Segment.Group>
            <Segment>
            <Item.Group>
                <Item>
                <Item.Image size="tiny" circular src={event.hostPhotoURL    } />
                <Item.Content>
                    <Item.Header as="a">{event.title}</Item.Header>
                    <Item.Description>
                    Hosted by <a>{event.hostedBy}</a>
                    </Item.Description>
                    {event.cancelled && 
                    <Label style={{top:'-40px'}} ribbon='right' color='red' content='This event is cancelled' /> }
                </Item.Content>
                </Item>
            </Item.Group>
            </Segment>
            <Segment>
            <span>
                <Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')} at {format(event.date.toDate(), 'hh:mm a')} |
                <Icon name="marker" /> {event.venue}
            </span>
            </Segment>
            <Segment secondary>
            <List horizontal>
                {event.attendees && Object.values(event.attendees).map((attendee, index) => { 
                        return <EventListAttendee key={index} attendee={attendee}/> ;
                      })}
                
            </List>
            </Segment>
            <Segment clearing>
            <span>{event.description}</span>
            <Button as="a" color="red" floated="right" content="Delete" onClick={deleteEvent(event.id)}/>
            <Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />
            </Segment>
        </Segment.Group>
    )
  }
}

export default EventListItem;