import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

import { BrowserRouter } from 'react-router-dom';
import './assets/css/app.css'
import { firebase } from './firebase';

const App = (props) => {
    return(
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}

firebase.auth().onAuthStateChanged((user) => {
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})


