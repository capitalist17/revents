import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const UserDetailedSidebar = ({isCurrentUser,followUser, profile}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        { isCurrentUser ?
        <Button as={Link} to='/settings' color="teal" fluid basic content="Edit Profile" /> 
        :<Button onClick={() => followUser(profile)} color="teal" fluid basic content="Follow user" /> 
      }
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;
