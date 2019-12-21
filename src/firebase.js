import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCBlJYcNtPBIL1T1EQ36qOqoZPN5TNMJAo",
    authDomain: "fifatitis.firebaseapp.com",
    databaseURL: "https://fifatitis.firebaseio.com",
    projectId: "fifatitis",
    storageBucket: "fifatitis.appspot.com",
    messagingSenderId: "55310192196",
    appId: "1:55310192196:web:609514e6665e4e5f7ab611"
};

const fire = firebase.initializeApp(firebaseConfig)

export default fire;