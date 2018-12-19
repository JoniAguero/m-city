import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebaseMatches } from '../../firebase';
import { firebaseLooper } from '../UI/misc';
import LeagueTable from './table';
import MatchesList from './MatchesList';

export class TheMatches extends Component {

    state = {
        loading: true,
        matches: [],
        filterMatches: [],
        playerFilter: 'All',
        resultFilter: 'All'
    }

    componentDidMount() {
        firebaseMatches.once('value')
            .then(snapshot => {
                const matches = firebaseLooper(snapshot);
                this.setState({
                    loading: false,
                    matches: matches.reverse(),
                    filterMatches: matches.reverse()
                })
            })
    }

    render() {
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                        </div>
                        <MatchesList 
                            matches={this.state.filterMatches}
                        />
                    </div>
                    <div className="right">
                        <LeagueTable />
                    </div>
                </div>
            </div>
        )
    }
}

export default TheMatches;