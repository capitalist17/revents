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
    providerId: state.firebase.auth.providerData[0].providerId
  }
}

const mapDispatchToProps = {
  updatePassword
}

const SettingsDashboard = ({providerId, updatePassword}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basic' />
          <Route path='/settings/basic' component={BasicPage}></Route>
          <Route path='/settings/about' component={AboutPage}></Route>
          <Route path='/settings/photos' component={PhotosPage}></Route>
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