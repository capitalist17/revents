/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';

//import moment from 'moment';
//import cuid from 'cuid'; // generates random unique ids 
import { createEvent, updateEvent, cancelToggle } from '../eventActions';

import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';


const mapStateToProps = (state, ownProps) => {
    //const eventId = ownProps.match.params.id;

    let event = {}; // since redux form is registering all our field we dont have to specify them manually
    
    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events[0]
    }
  
    // Since we are using redux forms, this component recieves additional props. One of those props is
    // initialValues. To this, we assign our event object. So, if we are updating the event, it will be
    // populated with existing values and if we are creating the event, it will be inited with null values.
    return { 
        initialValues: event,
        event:event,
        loading: state.async.loading 
    };
}

const mapDispatchToProps = {
    createEvent, updateEvent, cancelToggle
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
    state = {
        cityLatLng : {},
        venueLatLng : {},
        scriptLoaded: false
    }

    async componentDidMount(){
        const {firestore, match} = this.props;

        /* The code below just gets the document snapshot but wont listen to changes */
        // let event = await firestore.get(`events/${match.params.id}`);
        // if (event.exist){
        //     this.setState({
        //         venueLatLng: event.data().venueLatLng
        //     })
        // }

        /* The code below listens to changes but does not provide the doc snapshot
         so we stand a chance of losing the venueLatLng if a user modifies the document */
        await firestore.setListener(`events/${match.params.id}`); 
        
    }

    /* It is necessary to unset the listener. Sort of garbage collection in java */
    async componentWillUnmount(){
        const {firestore, match} = this.props;
        await firestore.unsetListener(`events/${match.params.id}`); 
    }

    handleScriptLoad = () => {
        this.setState({ scriptLoaded: true })
    }

    handleCitySelect = (selectedCity) => {
        geocodeByAddress(selectedCity)
          .then(results => getLatLng(results[0]))
          .then(latLng => this.setState({ cityLatLng : latLng }) )
          .then(() => { this.props.change('city', selectedCity) })
          .catch(error => console.error('Error', error)) 
    }

    handleVenueSelect = (selectedVenue) => {
        geocodeByAddress(selectedVenue)
          .then(results => getLatLng(results[0]))
          .then(latLng => this.setState({ venueLatLng : latLng }) )
          .then(() => { this.props.change('venue', selectedVenue) })
          .catch(error => console.error('Error', error)) 
    }

    onFormSubmit  = async (values) => {
        //console.log(values);
        values.venueLatLng = this.state.venueLatLng;

        if (this.props.initialValues.id){ // If id is present, then update the event, else a create a new one
            if (Object.keys(values.venueLatLng).length === 0){
                values.venueLatLng = this.props.event.venueLatLng
            }
            await this.props.updateEvent(values);
            this.props.history.goBack();
        } else {
            this.props.createEvent(values);
            this.props.history.push('/events');
        }        
    }

    render() {
        const { invalid, submitting, pristine, event, cancelToggle, loading } = this.props;
        return (
            <Grid>
                <Script 
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9EdV2JfPG1Vfviw9gf_HlblIUfs7Ie2E&libraries=places" 
                    onLoad = {this.handleScriptLoad} />
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
                                component={PlaceInput} options={{ types:['(cities)'] }}
                                onSelect={this.handleCitySelect} />
                            
                            { this.state.scriptLoaded && 
                            <Field name='venue' type='text' placeholder='Venue location' 
                                component={PlaceInput} 
                                onSelect={this.handleVenueSelect}
                                options={{
                                    location: new google.maps.LatLng(this.state.cityLatLng),
                                    radius:1000,
                                    types:['establishment'] 
                                }} /> }
                            <Field name='date' type='text' placeholder='Date and time of the event' width={7}
                                component={DateInput} dateFormat='YYYY-MM-DD HH:mm' timeFormat='HH:mm' showTimeSelect />
                            
                            <Button loading ={loading} disabled={invalid || submitting || pristine} 
                                    positive type="submit"> 
                                Submit 
                            </Button>
                            <Button disabled={loading} onClick={this.props.history.goBack} type="button">
                                Cancel
                            </Button>
                            {event.id &&
                            <Button type="button" color={event.cancelled ? 'green':'red'} floated='right'
                                content={event.cancelled ? 'Reactivate Event':'Cancel Event'}
                                onClick={() => cancelToggle(!event.cancelled, event.id)}/>  }
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
            
        )
        }
    }

export default withFirestore(
    connect(mapStateToProps, mapDispatchToProps)(
        reduxForm({ form: 'EventForm', enableReinitialize: true, validate })(EventForm)
    )
);