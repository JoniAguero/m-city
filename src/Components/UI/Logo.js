import React from 'react'
import { Link } from 'react-router-dom';
import mcity_logo from '../../assets/images/logos/manchester_city_logo.png'

const CityLogo = (props) => {

    const template = <div className='img_cover'
                          style={{
                              width: props.width,
                              height: props.height,
                              background: `url(${mcity_logo}) no-repeat`
                          }}></div>

    if(props-Link) {
        return(
            <Link to={props.linkTo} className='link_logo'>
                {template}
            </Link>
        )
    } else {
        return template;
    }
}

export default CityLogo
