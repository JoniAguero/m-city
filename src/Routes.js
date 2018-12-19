import React from 'react';
import Layout from './Hoc/Layout';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Switch } from 'react-router-dom';

import Home from './Components/Home'
import {SignIn} from './Components/Signin';
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoute from './Components/AuthRoutes/PrivateRoute';
import PublicRoute from './Components/AuthRoutes/PublicRoute';
import AdminMatches from './Components/Admin/Matches';
import Match from './Components/Admin/Matches/Match';
import TheTeam from './Components/TheTeam';
import AdminPlayers from './Components/Admin/Players';
import Player from './Components/Admin/Players/Player';
import TheMatches from './Components/TheMatches';
import NotFound from './Components/UI/NotFound';

const Routes = (props) => {
  return(
    <div>
      <Header/>
      <Layout>
        <Switch>
          <PrivateRoute {...props} exact component={Dashboard} path="/dashboard"/>
          <PrivateRoute {...props} exact component={Match} path="/admin_matches/match"/>
          <PrivateRoute {...props} exact component={Match} path="/admin_matches/match/:id"/>
          <PrivateRoute {...props} exact component={Player} path="/admin_players/player"/>
          <PrivateRoute {...props} exact component={Player} path="/admin_players/player/:id"/>
          <PrivateRoute {...props} exact component={AdminMatches} path="/admin_matches"/>
          <PrivateRoute {...props} exact component={AdminPlayers} path="/admin_players"/>
          <PublicRoute {...props} restricted={true} exact component={SignIn} path="/sign_in" />
          <PublicRoute {...props} restricted={false} exact component={TheTeam} path="/the_team"/>
          <PublicRoute {...props} restricted={false} exact component={TheMatches} path="/the_matches"/>
          <PublicRoute {...props} restricted={false} exact component={Home} path="/" />
          {/* NOT FOUND */}
          <PublicRoute {...props} restricted={false} exact component={NotFound} />
        </Switch>
      </Layout>
      <Footer/>
    </div>
  )
}

export default Routes;
