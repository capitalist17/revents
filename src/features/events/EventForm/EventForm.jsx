import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
class EventForm extends Component {
    state = {
        event: {
            title:'',
            date:'',
            city:'',
            venue:'',
            hostedBy:''
        }
    }
    onInputChange = (evt) => {
        const newEvent = this.state.event;
        newEvent[evt.target.name] = evt.target.value
        this.setState({
            event: newEvent
        })
    }
    onFormSubmit  = (evt) => {
        evt.preventDefault();
        console.log(this.state.event);
    }
  render() {
    const {handleCancel} = this.props;
    const {event} = this.state;
    return (
        <Segment>
            <Form onSubmit={this.onFormSubmit}>
                <Form.Field>
                    <label>Event Title</label>
                    <input name='title' value={event.title} onChange={this.onInputChange} placeholder="Event Title" />
                </Form.Field>
                <Form.Field>
                    <label>Event Date</label>
                    <input type="date" name='date' value={event.date} onChange={this.onInputChange} placeholder="Event Date" />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input name='city' value={event.city} onChange={this.onInputChange} placeholder="City event is taking place" />
                </Form.Field>
                <Form.Field>
                    <label>Venue</label>
                    <input name='venue' value={event.venue} onChange={this.onInputChange} placeholder="Enter the Venue of the event" />
                </Form.Field>
                <Form.Field>
                    <label>Hosted By</label>
                    <input name='hostedBy' value={event.hostedBy} onChange={this.onInputChange} placeholder="Enter the name of person hosting" />
                </Form.Field>
                <Button positive type="submit">
                    Submit
                </Button>
                <Button type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
        </Segment>
    )
  }
}

export default EventForm;