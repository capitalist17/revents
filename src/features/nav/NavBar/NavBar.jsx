import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Menu, Button, Container } from 'semantic-ui-react';

import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

const mapDispatchToProps = {
    openModal
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth
})

class NavBar extends Component {
  
  handleSignIn = () => {
    //this.setState({ authenticated: true });
    this.props.openModal('LoginModal')
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/'); 
    // Above line does not work for non routed components like the Navbar. If you see App.jsx, the Navbar
    // is shown irrespective of the router and is not configured inside the router. So in order to make
    // this work, we will have to use the higher order component called withRouter. We pass Navbar to 
    // this routing higher order component (withRouter) before we export in order to provide routing 
    // capabilities to navbar.
  };

  render() {
    const {auth} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header as={Link} to="/">
                    <img src="/assets/logo.png" alt="logo" />
                    Re-vents
                </Menu.Item>
                
                <Menu.Item as={NavLink} to="/events" name="Events" />
                <Menu.Item as={NavLink} to="/test" name="Test" />
                {authenticated && <Menu.Item as={NavLink} to="/people" name="People" /> }

                {authenticated && 
                <Menu.Item>
                    <Button as={Link} to="/createEvent" floated="right" positive inverted content="Create Event" />
                </Menu.Item>
                }

                {authenticated ? <SignedInMenu auth={auth} signOut={this.handleSignOut}/> 
                               : <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} /> }
                
            </Container>
        </Menu>
    )
  }
}

export default withRouter( withFirebase ( connect(mapStateToProps, mapDispatchToProps) (NavBar) ) );