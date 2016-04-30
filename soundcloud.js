function loadSc(){
    //attempt to load a song and return whether it worked or not
    $.ajax({
    url: 'https://api.soundcloud.com/resolve.json?url='+
    nextTrack+'/tracks&client_id='+'a52ad8c9bea7fc1421b4886e5c8ce670',
    type: 'GET',
    success: function(data){ 
        
        trackPlayer(data,playing);
        },
    error: function(data) {
        console.log("error loading song");
    }
});
}

//Plays SoundCloud Streams and handles button clicks and SC.stream events
function trackPlayer(track,status){
    SC.stream('/tracks/'+track["id"]).then(function(scplayer){
        var active=true;
        //Load Song info
        if (playing){
            scplayer.play();
        }
        if (playing){
        $("#nowplaying").text("Playing: " + track.user["username"] + " - " + track["title"]);}else{
        $("#nowplaying").text("Paused: " + track.user["username"] + " - " + track["title"]);    
        }
        
        var cover=track["artwork_url"];
        if (cover!=null){
        cover=cover.replace("large", "t500x500");
        $("#coverimage").attr("src",cover);}else{
        cover=track.user["avatar_url"];
        cover=cover.replace("large", "t500x500");
        $("#coverimage").attr("src",cover);
        }
        
        //When Song Finishes
        scplayer.on('finish',function(){
            $("#coverimage").attr("src","missing.jpg");
            $("#nowplaying").text("No Song Loaded");
            searching=true;
            active=false;
            scplayer.pause;
            playnext=true;
            console.log("end playback");
            songindex++;
            if(songindex<=lines.length-1){
                checkSource(lines[songindex]);}else{
                    getSongs(0);
                }
        });
        
        //Button Controls
        $(".controls").click(function(){
        var button = $(this).attr("id");
        switch(button) {
            case "play":
                if (active&&!playing){
                    console.log("play");
                    $("#nowplaying").text("Playing: " + track.user["username"] + " - " + track["title"]);
                    scplayer.play();
                    playing=true;
                    }
                break;
            case "pause":
                if (active&&playing){
                    console.log("pause");
                    $("#nowplaying").text("Paused: " + track.user["username"] + " - " + track["title"]);
                    scplayer.pause();
                    playing=false;
                    }
                break;
            case "next":
                /* In case you can remove links in the future
                if (songindex>lines.length){
                    songindex=lines.length-1;
                }*/
                if (active){
                    console.log("clicked next");
                    if(songindex+1<=lines.length-1){
                        active=false;
                        scplayer.pause();
                        playnext=true;
                        songindex++;
                        checkSource(lines[songindex]);}else{
                            getSongs(1);
                            }
                        }
                    }
                });
        //other event handling
    });
}
