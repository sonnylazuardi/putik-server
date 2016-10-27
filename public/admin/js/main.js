// Firebase Config
var config = {
apiKey: "AIzaSyBclP6jx0zxlAbQEmlXpsIcCwmypu7Sqoc",
authDomain: "petik-b0273.firebaseapp.com",
databaseURL: "https://petik-b0273.firebaseio.com",
storageBucket: "petik-b0273.appspot.com",
messagingSenderId: "1031285938511"
};
firebase.initializeApp(config);
var ref = firebase.database();

function getLyrics() {
	'use strict';
	var song = $('#song-slug').val()
    $.getJSON("http://getputik.com/songs/", function(result){
        var api = result.filter(function(song){
        	return song.slug == song;
        })[0];        
        var lyrics = api.lyrics_only.replace(/\\n/g, '<br>');
        $('#old-lyrics').html(lyrics);
    });
}

function updateCover() {
	'use strict';
	var slug = $('#song-slug').val(),
		new_image = $('#new_cover').val();

	firebase.database().ref('songs/' + slug).set({
		cover: new_image
	});
}

function updateYT() {
	'use strict';
	var slug = $('#song-slug').val(),
		new_link = $('#new-yt-link').val();

	firebase.database().ref('songs/' + slug).set({
		media: new_link
	});
}