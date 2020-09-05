import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAzukPmg2EfJD8nbbOvY4bT2rYEUr_Uj_g",
    authDomain: "minhasseries-630a4.firebaseapp.com",
    databaseURL: "https://minhasseries-630a4.firebaseio.com",
    projectId: "minhasseries-630a4",
    storageBucket: "minhasseries-630a4.appspot.com",
    messagingSenderId: "567239862220",
    appId: "1:567239862220:web:f44c10c7ad1fb23b2f5f69",
    measurementId: "G-QRG13QL7MH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;