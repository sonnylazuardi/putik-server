const FIREBASE_URL = 'https://petik-b0273.firebaseio.com';

const axios = require('axios');

axios.post(FIREBASE_URL + '/songs.json', {
    name: 'test',
    genre: 'test',
    cover: 'test'
});