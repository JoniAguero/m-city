import React from 'react';
import Layout from './Hoc/Layout';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/Home'

const Routes = (props) => {
  return(
    <div>
      <Header/>
      <Layout>
        <Switch>
          <Route exact component={Home} path="/" />
        </Switch>
      </Layout>
      <Footer/>
    </div>
  )
}

export default Routes;