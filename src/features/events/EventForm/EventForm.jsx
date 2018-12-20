import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'

import cuid from 'cuid'; // generates random unique ids 
import { createEvent, updateEvent } from '../eventActions';

import TextInput from '../../../app/common/form/TextInput';

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;
    let event = {
        title:'',
        date:'',
        city:'',
        venue:'',
        hostedBy:''
    };

    if(eventId && state.events.length > 0){
        event = state.events.filter(evt => evt.id === eventId)[0];
    }

    return { event };
}

const mapDispatchToProps = {
    createEvent, updateEvent
}

class EventForm extends Component {
   
    onFormSubmit  = (evt) => {
        evt.preventDefault();
        //console.log(this.state.event);
        if (this.state.event.id){ // If id is present, then update the event, else a create a new one
            this.props.updateEvent(this.state.event);
            this.props.history.goBack();
        } else {
            const newEvent = {...this.state.event, 
                                id: cuid(), 
                                hostPhotoURL:'/assets/user.png' };
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }        
    }
  render() {
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment>                    
                    <Form onSubmit={this.onFormSubmit}>
                        <Header sub color='teal' content='Event Details'></Header>
                        <Field name='title' type='text' component={TextInput} placeholder='Give your event a name' />
                        <Field name='category' type='text' component={TextInput} placeholder='What is your event about' />
                        <Field name='description' type='text' component={TextInput} placeholder='Describe more about your event' />
                        <Field name='hostedBy' type='text' component={TextInput} placeholder='Who is hosting this event' />
                        <Header sub color='teal' content='Event Location Details'></Header>
                        <Field name='city' type='text' component={TextInput} placeholder='In which city is this event held' />
                        <Field name='venue' type='text' component={TextInput} placeholder='Venue location' />
                        <Field name='date' type='text' component={TextInput} placeholder='Date when the event is held' />
                        
                        <Button positive type="submit">
                            Submit
                        </Button>
                        <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
        
    )
  }
}

export default 
connect(mapStateToProps, mapDispatchToProps) ( reduxForm({form:'EventForm'}) (EventForm) );