'use strict';

const FIREBASE_URL = 'https://petik-b0273.firebaseio.com';
const IMG_CHORD_PIANO = "img/chord/piano/";
const IMG_CHORD_GUITAR = "img/chord/guitar/";

const axios = require('axios');

module.exports = {
    getAllSongs: getAllSongs,
    getAllRootCategories: getAllRootCategories,
    getAllCategories: getAllCategories,
    getAllPlaylists: getAllPlaylists,
    getRootCategoryById: getRootCategoryById,
    getPlaylistById: getPlaylistById,
    getCategoryById: getCategoryById,
    putPlaylist: putPlaylist,
    putSongIntoPlaylist: putSongIntoPlaylist
}

////

function getAllSongs() {
    return axios.get(FIREBASE_URL + '/songs.json')
        .then(res => res.data)
        .then(data => transforms(data))
        .then(songs => songs.map(song => {
            if (song.chords) {
                song.chords = song.chords.filter(chord => chord);
                song.chords_piano = song.chords.map(pianoChordMapper);
                song.chords_guitar = song.chords.map(guitarChordMapper);
            }
            return song;
        }));
}

function getAllRootCategories() {
    return axios.get(FIREBASE_URL + '/root.json')
        .then(res => res.data)
        .then(data => transforms(data));
}

function getAllCategories() {
    return axios.get(FIREBASE_URL + '/categories.json')
        .then(res => res.data)
        .then(data => transforms(data));
}

function getAllPlaylists() {
    return axios.get(FIREBASE_URL + '/playlists.json')
        .then(res => res.data)
        .then(data => transforms(data));
}

function putPlaylist(name) {
    return axios.post(FIREBASE_URL + '/playlists.json', {
        name: name
    }).then(res => res.data);
}

function putActivePlaylist(name) {
    console.log(name);
    return axios.patch(FIREBASE_URL + '/.json', {
        activePlaylist: name
    }).then(res => res.data)
    .catch(err => console.log(err));
}

function putSongIntoPlaylist(playlistId, song) {
    return axios.post(FIREBASE_URL + '/playlists/' + playlistId + '/songs.json', song)
        .then(res => res.data);
}

function getRootCategoryById(rootId) {
    return getAllCategories()
        .then(catefories => catefories.filter(category => category.root === rootId));
}

function getCategoryById(categoryId) {
    return getAllSongs()
        .then(songs => songs.filter(song => song.category === categoryId));
}

function getPlaylistById(playlistId) {
    return axios.all([getAllPlaylists(), getAllSongs()])
        .then(axios.spread((playlists, songs) => {
            return {
                playlists: playlists,
                songs: songs
            };
        }))
        .then(data => {
            let playlist = data.playlists.find(playlist => playlist.slug === playlistId)
            if (playlist) {
                let songs = Object.keys(playlist.songs).map(k => playlist.songs[k]);
                playlist.songs = songs.map(song => {
                    var availableSongs = data.songs;
                    return availableSongs.find(availableSong => availableSong.slug === song);
                });
            }
            return playlist ? playlist : {};
        });
}

//// helpers

function transforms(data) {
    return Object.keys(data).map(slug => {
        let category = data[slug];
        category.slug = slug;
        return category;
    });
}

function pianoChordMapper(chord) {
    if (!chord) chord = '';
    chord = chord.replace("#", "s");
    let path = IMG_CHORD_PIANO + chord + ".png";
    return path;
}

function guitarChordMapper(chord) {
    if (!chord) chord = '';
    chord = chord.replace("#", "s");
    let path = IMG_CHORD_GUITAR + chord + ".png"; 
    return path;
}

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}