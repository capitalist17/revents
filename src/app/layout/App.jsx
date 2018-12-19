import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import EventForm from '../../features/events/EventForm/EventForm';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>

        <Route path='/(.+)' render = { () => {
          return (<div>
                    <NavBar />
                    <Container className="main">          
                      {/* <EventDashboard /> */}
                      <Switch>
                        <Route path='/test' component={TestComponent} />
                        <Route path='/events' component={EventDashboard} />
                        <Route path='/event/:id' component={EventDetailedPage} />
                        <Route path='/manage/:id' component={EventForm} />
                        <Route path='/people' component={PeopleDashboard} />
                        <Route path='/profile/:id' component={UserDetailedPage} />
                        <Route path='/settings' component={SettingsDashboard} />
                        <Route path='/createEvent' component={EventForm} />        
                      </Switch>  
                    </Container>
                  </div> )
        }}/>
         
      </div>  
    );
  }
}

export default App;
