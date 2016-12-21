// Initialize Firebase
var config = {
    apiKey: "AIzaSyBclP6jx0zxlAbQEmlXpsIcCwmypu7Sqoc",
    authDomain: "petik-b0273.firebaseapp.com",
    databaseURL: "https://petik-b0273.firebaseio.com",
    storageBucket: "petik-b0273.appspot.com",
    messagingSenderId: "1031285938511"
};
firebase.initializeApp(config);

// $(document).ready(function(){    
//     $.getJSON("http://getputik.com/songs/", function(result){
//         var api = result.filter(function(song){
//         	return song.name == 'Good Good Father';
//         })[0];

//         var piano_chords = api.chords_piano.map(function(chord){
//         	final_result_piano = '<img src=\"'+chord_piano+'\" />'
//         	return final_result_piano;
//         });

//         var guitar_chords = api.chords_guitar.map(function(chord){
//         	final_result_guitar = '<img src=\"'+chord_guitar+'\" />'
//         	return final_result_guitar;
//         });

//         var song_name = api.name;
//         var author = api.artist;
//         var lyrics = api.lyrics.replace(/\\n/g, '<br>');
//         var piano = piano_chords;
//         var guitar = guitar_chords;

//         $('#song_name').html(song_name);
//         $('#artist').html(author);
//         $('#lyrics').html(lyrics);
//         $('#piano').html(piano);
//         $('#gitar').html(guitar);
//     });
// });

function subscribe() {
    'use strict';
    // Inputs
    var name = $('#name').val(),
        email = $('#email').val();

    firebase.database().ref('subscriber').push().set({
        name: name,
        email: email
    })

    console.log('Succesfully subscribed');
    alert("You are now subscribed to our newsletter");
}