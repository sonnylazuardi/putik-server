'use strict'

const FIREBASE_URL = 'https://petik-b0273.firebaseio.com';

const express = require('express');
const axios = require('axios');
const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('Putik ROCKS!!!');
})

app.get('/categories', (req, res) => {
    axios.get(FIREBASE_URL + '/categories.json')
        .then((data) => {
            let keys = Object.keys(data.data);
            res.json(keys.map((k) => data.data[k]));
        })
        .catch((error) => console.log(error));
});

app.listen(app.get('port'), () => {
    console.log('PUTIK will rock at ' + app.get('port'));
});

function addCategory(db, category) {
    db.ref('/categories').push({
        name: 'Hello',
        genre: 'top50',
        cover: 'asdasd'
    });
}