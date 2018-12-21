import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';

const LoginForm = () => {
  return (
    <Form error size="large">
      <Segment>
        <Field name="email" type="text" placeholder="Email Address"  component={TextInput} />
        <Field name="password" type="password" placeholder="password" component={TextInput} />

        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default reduxForm({form: 'registerForm'})(LoginForm);