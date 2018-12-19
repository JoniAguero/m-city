import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../UI/FormField';
import { validate } from '../../UI/misc';

import {
    firebasePlayers,
    firebaseDB,
    firebase
} from '../../../firebase';
import Fileuploader from '../../UI/Fileuploader';

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
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
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
                firebase.storage().ref('players')
                    .child(player.image)
                    .getDownloadURL()
                    .then( url => {
                        this.updateFields(player, playerId, 'Edit Player', url);
                    })
                    .catch( e => {
                        this.setState({
                            formError: true
                        })
                    })
            })
        }
    }

    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormdata = {...this.state.formdata};
        for (const key in newFormdata) {
            newFormdata[key].value = player[key];
            newFormdata[key].valid = 'true';
        }
        this.setState({
            playerId,
            defaultImg,
            formType,
            formdata: newFormdata
        })
        console.log(this.state);
    }

    updateForm = (element, content = '') => {
        const newFormdata = { ...this.state.formdata}
        const newElement = { ...newFormdata[element.id]}

        if(content === '') {
            newElement.value = element.event.target.value
        } else {
            newElement.value = content
        }

        let valid = validate(newElement)
        newElement.valid = valid[0]
        newElement.validationMessage = valid[1]

        newFormdata[element.id] = newElement
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    successForm = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
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

        if (formIsValid) {
            if(this.state.formType === 'Edit Player') {
                firebaseDB.ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm('Update correctly')
                    })
                    .catch( err => {
                        this.setState({
                            formError: true
                        })
                    })
            } else {
                firebasePlayers.push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_players')
                    })
                    .catch(err => {
                        this.setState({
                            formError: true
                        })
                    })
            }
        } else {
            this.setState({
                formError: true
            })
        }

    }

    resetImage = () => {
        const newFormdata = {...this.state.formdata} 
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;
        this.setState({
            defalutImg: '',
            formdata: newFormdata
        })
    }

    storeFilename = (filename) => {
        this.updateForm({id: 'image'}, filename)
    }

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
            <h2>{this.state.formType}</h2>
            <div>
                <form onSubmit={(event) => this.submitForm(event)}>

                    <Fileuploader 
                        dir='players'
                        tag={'Player Image'}
                        defaultImg={this.state.defaultImg}
                        defaultName={this.state.formdata.image.value}
                        resetImage={() => this.resetImage()}
                        filename={(filename)=> this.storeFilename(filename)}
                    />

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
