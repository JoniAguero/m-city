import firebase from 'firebase/app'
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBHutwTXy4i2w11WZW6dn6njUmOoWhz-A0",
    authDomain: "m-city-ec908.firebaseapp.com",
    databaseURL: "https://m-city-ec908.firebaseio.com",
    projectId: "m-city-ec908",
    storageBucket: "m-city-ec908.appspot.com",
    messagingSenderId: "687629097521"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database()
const firebaseMatches  = firebaseDB.ref('matches')
const firebasePromotions = firebaseDB.ref('promotions')
const firebaseTeams = firebaseDB.ref('teams')
const firebasePlayers = firebaseDB.ref('players')

export {
    firebase,
    firebaseDB,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers
}