const FIREBASE_URL = 'https://petik-b0273.firebaseio.com';

const axios = require('axios');

module.exports = {
    getAllSongs: getAllSongs,
    getAllCategories: getAllCategories,
    getAllPlaylists: getAllPlaylists,
    getPlaylistById: getPlaylistById,
    getCategoryById: getCategoryById,
}

function getAllSongs() {
    return axios.get(FIREBASE_URL + '/songs.json')
        .then(res => res.data)
        .then(data => transforms(data))
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

function getCategoryById(categoryId) {
    return axios.all([getAllCategories(), getAllSongs()])
        .then(axios.spread((categories, songs) => {
            return {
                categories: categories,
                songs: songs
            };
        }))
        .then(data => {
            let category = data.categories.find(category => category.slug === categoryId);
            if (category) category.songs = data.songs.filter(song => song.category === categoryId);
            return category ? category : {};
        });
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

function transforms(data) {
    return Object.keys(data).map(slug => {
        let category = data[slug];
        category.slug = slug;
        return category;
    });
}
