import firebase from 'firebase/app'
import 'firebase/app';
import 'firebase/database';

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
firebaseDB.ref('matches').once('value').then((snapshopt) => {
    console.log(snapshopt.val()) // val() trae los valores
})