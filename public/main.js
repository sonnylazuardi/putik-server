$(document).ready(function(){    
    $.getJSON("http://getputik.com/songs/", function(result){
        var api = result.filter(function(song){
        	return song.name == 'Good Good Father';
        })[0];

        var piano_chords = api.chords_piano.map(function(chord){
        	final_result_piano = '<img src=\"'+chord_piano+'\" />'
        	return final_result_piano;
        });

        var guitar_chords = api.chords_guitar.map(function(chord){
        	final_result_guitar = '<img src=\"'+chord_guitar+'\" />'
        	return final_result_guitar;
        });

        var song_name = api.name;
        var author = api.artist;
        var lyrics = api.lyrics.replace(/\\n/g, '<br>');
        var piano = piano_chords;
        var guitar = guitar_chords;

        $('#song_name').html(song_name);
        $('#artist').html(author);
        $('#lyrics').html(lyrics);
        $('#piano').html(piano);
        $('#gitar').html(guitar);
    });
});