import React from 'react'
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {firebase} from '../../../firebase'

const AdminNav = () => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Players',
            linkTo: '/admin_players/player'
        }
    ];
    
    const style = {
        color: '#ffffff',
        fontWeigth: '300',
        borderBottom: '1px solid #353535'
    }

    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )

    const logoutHandler = () => {
        firebase.auth().signOut().then(() => {
            
        }, (err) => {

        })
    }

  return (
    <div>
      {renderItems()}
        <ListItem button style={style} onClick={() =>logoutHandler()}>
            Log out
        </ListItem>
    </div>
  )
}

export default AdminNav
