import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../UI/FormField';
import { validate, firebaseLooper } from '../../UI/misc';
import {
    firebaseMatches,
    firebaseDB
} from '../../../firebase';

export class Player extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Lastname',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name: 'number_input',
                    type: 'number'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        {key:'Keeper', value:'Keeper'},
                        {key:'Defence', value:'Defence'},
                        {key:'Midfield', value:'Midfield'},
                        {key:'Striker', value:'Striker'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
        }
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if (!playerId) {
            this.setState({
                formType: 'Add Player'
            })
        } else {
            firebaseDB.ref(`players/${playerId}`).once('value').then((snapshot) => {
                const player = snapshot.val();
            })
        }
    }

    updateForm = (element) => {
        const newFormdata = { ...this.state.formdata
        }
        const newElement = { ...newFormdata[element.id]
        }
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

    submitForm = (e) => {
        e.preventDefault();
        let dataToSubmit = {}
        let formIsValid = true;
        for (const key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if (formIsValid) {
            
        } else {
            this.setState({
                formError: true
            })
        }

    }

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
            <h2>{this.state.formType}</h2>
            <div>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField 
                        id={'name'}
                        formdata={this.state.formdata.name}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField 
                        id={'lastname'}
                        formdata={this.state.formdata.lastname}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField 
                        id={'number'}
                        formdata={this.state.formdata.number}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField 
                        id={'position'}
                        formdata={this.state.formdata.position}
                        change={(element)=>this.updateForm(element)}
                    />
                    <div className="success_label">{this.state.formSuccess}</div>
                    { this.state.formError ?
                        <div className="error_label">
                            Something is wrong
                        </div>
                        : ''
                    }
                    <div className="admin_submit">
                        <button onClick={(event) => this.submitForm(event)}>
                            {this.state.formType}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </AdminLayout>
    )
  }
}

export default Player
