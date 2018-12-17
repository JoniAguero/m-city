import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import FormField from '../../UI/FormField';
import { validate } from '../../UI/misc';

export class Enroll extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'text',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  }

  submitForm = (e) => {

  }

  updateForm = (element) => {
    const newFormdata = {...this.state.formdata}
    const newElement = {...newFormdata[element.id]}
    newElement.value = element.event.target.value

    let valid = validate(newElement)
    newElement.valid = valid[0]
    newElement.validationMessage = valid[1]

    newFormdata[element.id] = newElement
    this.setState({
      formdata: newFormdata
    })
  }

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">
              Enter your email
            </div>
            <div className="enroll_input">
              <FormField 
                id={'email'}
                formdata={this.state.formdata.email}
                change={(element)=>this.updateForm(element)}
              />
            </div>
          </form>
        </div>
      </Fade>
    )
  }
}

export default Enroll

