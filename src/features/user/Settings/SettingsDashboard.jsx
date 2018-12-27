import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';

import { updatePassword } from '../../auth/authActions';

const mapStateToProps = (state) => {
  return {
    providerId: state.firebase.auth.providerData[0].providerId,
    user: state.firebase.profile
  }
}

const mapDispatchToProps = {
  updatePassword
}

// all the state information as well as action information is passed to this component as props parameter
const SettingsDashboard = ({providerId, updatePassword, user}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basic' />
          {/* If you want the fields to be populated, then use initialvalues */}
          <Route path='/settings/basic' render={() => <BasicPage initialValues={user} />} ></Route>
          <Route path='/settings/about' component={AboutPage}></Route>
          <Route path='/settings/photos' component={PhotosPage}></Route>
          {/* In case of AccountPage n initialvalues had to be populated as its a password field */}
          <Route path='/settings/account' 
                 render={() => <AccountPage providerId={providerId} 
                                            updatePassword={updatePassword} />} >
          </Route>
        </Switch>
      </Grid.Column>

      <Grid.Column width={4}>
        <SettingsNav/>
      </Grid.Column>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard)