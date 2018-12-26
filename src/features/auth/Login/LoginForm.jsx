import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import TextInput from '../../../app/common/form/TextInput';
import { login } from '../../auth/authActions';

const mapDispatchToProps ={
  login
}

// Because we are using redux-forms we also have access to handleSubmit
const LoginForm = ({login, handleSubmit, error}) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field name="email" type="text" placeholder="Email Address"  component={TextInput} />
        <Field name="password" type="password" placeholder="password" component={TextInput} />
        {error && <Label basic color='red'>{error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(null,mapDispatchToProps)(reduxForm({form: 'registerForm'})(LoginForm));