import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';

import cuid from 'cuid'; // generates random unique ids 
import { createEvent, updateEvent } from '../eventActions';

import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = { }; // since redux form is registering all our field we dont have to specify them manually

    if(eventId && state.events.length > 0){
        event = state.events.filter(evt => evt.id === eventId)[0];
    }

    // Since we are using redux forms, this component recieves additional props. One of those props is
    // initialValues. To this, we assign our event object. So, if we are updating the event, it will be
    // populated with existing values and if we are creating the event, it will be inited with null values.
    return { initialValues: event };
}

const mapDispatchToProps = {
    createEvent, updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'}
];

const validate = combineValidators({
    title: isRequired({message: "The event title is required"}),
    category: isRequired({message: 'Please provide a category'}),
    description: composeValidators(
                    isRequired({message: 'Please enter a description'}),
                    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
                )(),                 
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date')
  });

class EventForm extends Component {
   
    onFormSubmit  = (values) => {
        //console.log(values);
       
        if (this.props.initialValues.id){ // If id is present, then update the event, else a create a new one
            this.props.updateEvent(values);
            this.props.history.goBack();
        } else {
            const newEvent = {...values, 
                                id: cuid(), 
                                hostPhotoURL:'/assets/user.png' };
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }        
    }
    render() {
        const {invalid, submitting, pristine} = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>                    
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                            <Header sub color='teal' content='Event Details'></Header>
                            <Field name='title' type='text' placeholder='Give your event a name' 
                                component={TextInput} />
                            <Field name='category' type='text' placeholder='What is your event about'  
                                component={SelectInput} options={category} width={5} />
                            <Field name='description' type='text' placeholder='Describe more about your event' 
                                rows={4} component={TextArea} />
                            <Field name='hostedBy' type='text' placeholder='Who is hosting this event' 
                                component={TextInput} />
                            <Header sub color='teal' content='Event Location Details'></Header>
                            <Field name='city' type='text' placeholder='In which city is this event held' 
                                component={TextInput} />
                            <Field name='venue' type='text' placeholder='Venue location' 
                                component={TextInput} />
                            <Field name='date' type='text' placeholder='Date and time of the event' width={7}
                                component={DateInput} dateFormat='DD-MMM-YYYY HH:mm' timeFormat='HH:mm' showTimeSelect />
                            
                            <Button disabled={invalid || submitting || pristine} positive type="submit"> 
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

export default connect(mapStateToProps, mapDispatchToProps) ( 
                            reduxForm({form:'EventForm', enableReinitialize: true, validate}) (EventForm) 
                            );