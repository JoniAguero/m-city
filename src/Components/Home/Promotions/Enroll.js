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

  resetFormSuccess() {
    const newFormdata = {...this.state.formdata}
    for (const key in newFormdata) {
      newFormdata[key].value = '';
      newFormdata[key].valid = false;
      newFormdata[key].validationMessage = '';
    }
    this.setState({
      formError: false,
      formdata: newFormdata,
      formSuccess: 'Congratulations'
    })

    setTimeout(() => {
      this.setState({
        formSuccess: ''
      })
    }, 2000);
  }

  submitForm = (e) => {
    e.preventDefault();
    let dataToSubmit = {}
    let formIsValid = true;
    for (const key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if(formIsValid) {
      console.log(formIsValid);
      this.resetFormSuccess();
    } else {
      this.setState({
        formError: true
      })
    }

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
      formError: false,
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
              {this.state.formError ? <div className="error_label">
                Something is wrong, try again.
              </div> : null}
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={(event)=>this.submitForm(event)}>Enroll</button>
            </div>
          </form>
        </div>
      </Fade>
    )
  }
}

export default Enroll

