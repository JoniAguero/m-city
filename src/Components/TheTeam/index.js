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

    showPlayerByCategory = (category) => (
        this.state.players ?
            this.state.players.map((player, i) => {
                return player.position === category ?
                    <Fade delay={i*20} left key={i}>
                        <div className="item">
                            <PlayerCard 
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                bck={player.url}
                            />
                        </div>
                    </Fade>
                :null
            })
        : null
    )

  render() {
    return (
        <div 
            className="the_team_container"
            style={{
                background: `url(${stripes}) repeat`
            }}
        >
            { !this.state.loading ?
                <div>
                    <div className="team_category_wrapper">
                        <div className="title">
                            Keepers
                        </div>
                        <div className="team_cards">
                            { this.showPlayerByCategory('Keeper') }
                        </div>
                        <div className="title">
                            Defences
                        </div>
                        <div className="team_cards">
                            { this.showPlayerByCategory('Defence') }
                        </div>
                        <div className="title">
                            Midfield
                        </div>
                        <div className="team_cards">
                            { this.showPlayerByCategory('Midfield') }
                        </div>
                        <div className="title">
                            Strikers
                        </div>
                        <div className="team_cards">
                            { this.showPlayerByCategory('Striker') }
                        </div>
                    </div>
                </div>
                :null
            }
        </div>
    )
  }
}

export default TheTeam
