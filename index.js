'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const database = require('./database');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());

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

app.get('/root_categories', (req, res) => {
    database.getAllRootCategories()
        .then(data => res.json(data))
        .catch(error => console.log(error));
});

app.get('/root_categories/:rootId', (req, res) => {
    let rootId = req.params.rootId;
    
    database.getRootCategoryById(rootId)
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

app.post('/playlists', (req, res) => {
    database.putPlaylist(req.body.name)
        .then(playlistId => res.send(playlistId))
        .catch(error => console.log(error));
});

app.post('/playlists/:playlistId', (req, res) => {
    let playlistId = req.params.playlistId;

    database.putSongIntoPlaylist(playlistId, req.body)
        .then(ok => res.send(ok))
        .catch(error => console.log(error));
});

app.listen(app.get('port'), () => {
    console.log('PUTIK will rock at ' + app.get('port'));
});
