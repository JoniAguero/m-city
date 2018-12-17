import React from 'react'
import Featured from './Featured';
import MatchesHome from './Matches';
import HomeMeetPlayers from './Players';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <HomeMeetPlayers />
    </div>
  )
}

export default Home
