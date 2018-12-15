import React from 'react';
import Layout from './Hoc/Layout';
import Header from './Components/Header';
import Footer from './Components/Footer';

const Routes = (props) => {
  return(
    <div>
      <Header/>
      <Layout/>
      <Footer/>
    </div>
  )
}

export default Routes;
