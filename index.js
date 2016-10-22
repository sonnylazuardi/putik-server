'use strict'

const express = require('express');
const app = express();

const database = require('./database');

app.set('port', (process.env.PORT || 3000));

app.get('/', (req, res) => {
    res.send('Putik ROCKS!!!');
})

app.get('/songs', (req, res) => {
    database.getAllSongs()
        .then(data => res.json(data))
        .catch(error => console.log(error));
});

app.get('/categories', (req, res) => {
    database.getAllCategories()
        .then(data => res.json(data))
        .catch(error => console.log(error));
});

app.get('/categories/:categoryId', (req, res) => {
    let categoryId = req.params.categoryId;

    database.getCategoryById(categoryId)
        .then(data => res.json(data))
        .catch(error => console.log(error));
});

app.get('/playlists', (req, res) => {
    database.getAllPlaylists()
        .then(data => res.json(data))
        .catch(error => console.log(error));
});

app.get('/playlists/:playlistId', (req, res) => {
    let playlistId = req.params.playlistId;
    
    database.getPlaylistById(playlistId)
        .then(data => res.json(data))
        .catch(error => console.log(error));
});

app.listen(app.get('port'), () => {
    console.log('PUTIK will rock at ' + app.get('port'));
});
