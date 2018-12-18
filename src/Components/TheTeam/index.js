import React, { Component } from 'react';
import PlayerCard from '../UI/PlayerCard';
import Fade from 'react-reveal/Fade';
import stripes from '../../assets/images/stripes.png';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../UI/misc';
import { Promise } from 'core-js';

export class TheTeam extends Component {

    state = {
        loading: true,
        players: []
    }

    componentDidMount() {
        firebasePlayers.once('value').then(snapshot => {
            const players = firebaseLooper(snapshot);
            let promises = [];
            for (const key in players) {
                promises.push(
                    new Promise((resolve, reject) =>{
                        firebase.storage().ref('players')
                            .child(players[key].image).getDownloadURL()
                                .then( url => {
                                    players[key].url = url;
                                    resolve();
                                })
                                .catch(err => {
                                    console.error(err);
                                    reject()
                                })
                    })
                )
            }
            Promise.all(promises).then(() => {
                this.setState({
                    loading: false,
                    players
                })
            })
        })
    }

  render() {
      console.log(this.state.players);
      
    return (
      <div>
        
      </div>
    )
  }
}

export default TheTeam
