import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const UserDetailedPhotos = ({photos}) => {
  return (
    <Grid.Column width={12}>
    <Segment attached>
      <Header icon="image" content="Photos" />

      <Image.Group size="small">
        {photos && 
          photos.map(photo => 
            // Aside, use offset={-150} to show the images only when it reaches the viewport of 150
            // In other word, display images when the user scrolls down to that point where images
            // are placed inside the page.
            <LazyLoad key={photo.id} height={150} placeholder={<Image src='/assets/user.png' />}>
              <Image src={photo.url} />
            </LazyLoad>
          )}
      </Image.Group>
    </Segment>
  </Grid.Column>
  )
}

export default UserDetailedPhotos
