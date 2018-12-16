import React, { Component } from 'react'
import CityLogo from '../UI/Logo';

export default class Footer extends Component {

  year = new Date().getFullYear()

  render() {
    return (
      <footer className='bck_blue'>
        <div className='footer_logo'>
          <CityLogo 
            width='70px'
            height='70px'
            link={true}
            linkTo='/'
          />
        </div>
        <div className='footer_discl'>
          Manchester City {this.year}. All rights reserved.
        </div>
      </footer>
    )
  }
}
