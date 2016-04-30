//Initialize SoundCloud
SC.initialize({
  client_id: 'a52ad8c9bea7fc1421b4886e5c8ce670'
});
function setId(id){
    var roomid=id;
}
//is song playing 
var playing=false;
//is a song loaded or ready to be played
var loaded=false;
//play next song yet?
var playnext=true;
//Next song to be played
var nextTrack="";
//Song Index in playlist
var songindex=2;
//searching
var searching=false;
//array of lines
var lines=[];
//is youtube player ready
var ready=false;
//is youtube player done playing
var done = false;
//prevents search url from being submitted (Deprecated)
$("#surl").submit(function(event) {
    event.preventDefault();
});

function checkSource(link){
    
    if (/(https:\/\/soundcloud.com\/)[a-z|\-|\_|\d]*[\/][a-z|\-|\_|\d]*[\s]?/.test(link)){
        console.log("soundcloud link: "+link);
        if (!loaded){
            loaded=true;
        }
        if (playnext){
            nextTrack=link;
                loadSc();
                playnext=false;
            }
    }else if(/[a-z|\d|\_|\-]{11}/i.test(link)){
        if (playnext){
            console.log("youtube id: "+link);
            nextTrack=link;
            playnext=false;
            playYt();
        }}
}

//get Youtube video info

function getInfo(){
  $.get(
      "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet',
      q: nextTrack,
      type: 'video',
      videoCategoryId: '10',
      key: 'AIzaSyBR8jZq8GALRNQjIFuVjeLG9ocTrV1xQcQ'
    },function(data){console.log(data);
    var obj=data.items[0];
    if (playing){
        $("#nowplaying").text("Playing: " + obj.snippet.title)}else{
        $("#nowplaying").text("Paused: " + obj.snippet.title);    
        }
    }
  );
}

function getSongs(mode){
    var file = roomid+".txt";
    getFile(file,mode);
    console.log(songindex);
}
var refresh;

function getFile(file,mode){
    $.ajax({
        //Needs to synchronous to be able save the variable to lines
       url:file,
       type:'get',
       data:{'GetConfig':'YES'},
       dataType:"TEXT",
       success: function(data){updatelines(data,mode);}
       });
}

function updatelines(data,mode){
    var arr=data.split('\n');
    if (arr.length>2&&arr.length>lines.length){
        searching=false;
       console.log("updating lines...");
        lines=arr;
        console.log(lines);
        checkSource(lines[songindex])
           }else{
               console.log("no new songs");
               if (mode==0){
               setTimeout(function(){ getSongs(0); }, 200);}else{
                   searching=false;
               }
    }
}


//load first song when page is loaded
$(document).ready(function(){
    getSongs(0);
});

