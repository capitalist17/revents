import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const TextArea = ({ input, rows, type, placeholder, meta: {touched, error} }) => {
  // console.log(input); // uncomment this and inspect this in browser. Later comment it back again.
  return (
    <Form.Field error={touched && !!error} style={{border:'1px solid #A9A9A9'}}>
      <textarea {...input} placeholder={placeholder} rows={rows} type={type}/>
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}

export default TextArea
