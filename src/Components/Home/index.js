import React from 'react'
import Featured from './Featured';
import MatchesHome from './Matches';
import HomeMeetPlayers from './Players';
import Promotion from './Promotions';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <HomeMeetPlayers />
      <Promotion />
    </div>
  )
}

export default Home
