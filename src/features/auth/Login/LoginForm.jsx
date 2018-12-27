import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import TextInput from '../../../app/common/form/TextInput';
import { login, socialLogin } from '../../auth/authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const mapDispatchToProps ={
  login,
  socialLogin
}

// Because we are using redux-forms we also have access to handleSubmit
const LoginForm = ({login,socialLogin, handleSubmit, error}) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field name="email" type="text" placeholder="Email Address"  component={TextInput} />
        <Field name="password" type="password" placeholder="password" component={TextInput} />
        {error && <Label basic color='red'>{error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>or</Divider>
        <SocialLogin socialLogin={socialLogin}/>
      </Segment>
    </Form>
  );
};

export default connect(null,mapDispatchToProps)(reduxForm({form: 'registerForm'})(LoginForm));