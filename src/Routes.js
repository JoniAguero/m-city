import React from 'react';
import Layout from './Hoc/Layout';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/Home'
import {SignIn} from './Components/Signin';
import Dashboard from './Components/Admin/Dashboard';
import AuthRoutes from './Components/AuthRoutes';

const Routes = (props) => {
  console.log(props);
  return(
    <div>
      <Header/>
      <Layout>
        <Switch>
          <AuthRoutes {...props} exact component={Dashboard} path="/dashboard"/>
          <Route exact component={Home} path="/" />
          <Route exact component={SignIn} path="/sign_in" />
        </Switch>
      </Layout>
      <Footer/>
    </div>
  )
}

export default Routes;
