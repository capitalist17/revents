import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import Loadable from 'react-loadable';
import LoadingComponent from './LoadingComponent';
// import HomePage from '../../features/home/HomePage';
// import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
// import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
// import EventForm from '../../features/events/EventForm/EventForm';
// import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
// import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
// import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
// import NavBar from '../../features/nav/NavBar/NavBar';
// import TestComponent from '../../features/testarea/TestComponent';
// import ModalManager from '../../features/modals/ModalManager';
// import NotFound from './NotFound';

const AsyncHomePage = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading: LoadingComponent
})
const AsyncEventDashboard = Loadable({
  loader: () => import('../../features/events/EventDashboard/EventDashboard'),
  loading: LoadingComponent
})
const AsyncEventDetailedPage = Loadable({
  loader: () => import('../../features/events/EventDetailed/EventDetailedPage'),
  loading: LoadingComponent
})
const AsyncEventForm = Loadable({ 
  loader: () => import('../../features/events/EventForm/EventForm'),
  loading: LoadingComponent
})
const AsyncNavBar  = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading: LoadingComponent
})
const AsyncTestComponent  = Loadable({
  loader: () => import('../../features/testarea/TestComponent'),
  loading: LoadingComponent
})
const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../features/user/Settings/SettingsDashboard'),
  loading: LoadingComponent
})
const AsyncUserDetailedPage = Loadable({
  loader: () => import('../../features/user/UserDetailed/UserDetailedPage'),
  loading: LoadingComponent
})
const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../features/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingComponent
})
const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingComponent
})
const AsyncNotFound = Loadable({
  loader: () => import('../../app/layout/NotFound'),
  loading: LoadingComponent
})

class App extends Component {
  render() {
    return (
      <div>
        <AsyncModalManager/>
        <Switch>
          <Route exact path='/' component={AsyncHomePage} />
        </Switch>

        <Route path='/(.+)' render = { () => {
          return (<div>
                    <AsyncNavBar />
                    <Container className="main"> 
                      <Switch>
                        <Route path='/test' component={AsyncTestComponent} />
                        <Route path="/events" component={AsyncEventDashboard} />
                        <Route path="/event/:id" component={AsyncEventDetailedPage} />
                        <Route path="/manage/:id" component={UserIsAuthenticated(AsyncEventForm)} />
                        <Route path="/people" component={UserIsAuthenticated(AsyncPeopleDashboard)} />
                        <Route path="/profile/:id" component={UserIsAuthenticated(AsyncUserDetailedPage)} />
                        <Route path="/settings" component={UserIsAuthenticated(AsyncSettingsDashboard)} />
                        <Route path="/createEvent" component={UserIsAuthenticated(AsyncEventForm)} />
                        <Route path="/error" component={AsyncNotFound} />
                        <Route component={AsyncNotFound} />     
                      </Switch>  
                    </Container>
                  </div> )
        }}/>
         
      </div>  
    );
  }
}

export default App;
