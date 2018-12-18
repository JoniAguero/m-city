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
import EditMatch from './Components/Admin/Matches/EditMatch';

const Routes = (props) => {
  console.log(props);
  return(
    <div>
      <Header/>
      <Layout>
        <Switch>
          <PrivateRoute {...props} exact component={Dashboard} path="/dashboard"/>
          <PrivateRoute {...props} exact component={AdminMatches} path="/admin_matches"/>
          <PrivateRoute {...props} exact component={EditMatch} path="/admin_matches/edit_match/:id"/>
          <PublicRoute {...props} restricted={false} exact component={Home} path="/" />
          <PublicRoute {...props} restricted={true} exact component={SignIn} path="/sign_in" />
        </Switch>
      </Layout>
      <Footer/>
    </div>
  )
}

export default Routes;
