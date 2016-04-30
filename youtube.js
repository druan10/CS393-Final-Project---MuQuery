
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    
      playerVars: { 
   'autoplay': 0,
   'controls': 0, 
   'disablekb': 1,
   'fs': 0,
   'rel' : 0},
    height: '480',
    width: '640',
    events: {
      'onReady': function(){
        console.log("player is ready");
        ready=true;
      },
      'onStateChange': onPlayerStateChange
    }
  });
    // block screen so user cant click
  var blockDiv = $(document.createElement('div'))
          .attr('id', 'blockDiv')
          .height('480px').width('100%')
          .css({'z-index':'3333', 'position' : 'absolute'});
  $('#blocked').prepend(blockDiv);
  
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),

function onPlayerStateChange(event) {
  console.log(event);
    if (event.data==YT.PlayerState.PLAYING){
      if (!playing){
            player.pauseVideo();
      }
  }
  //end of playback
  if (event.data == YT.PlayerState.ENDED && !done) {
    done = true;
    playnext=true;
    console.log("end playback");
    $("#player").css({'height':'0px','visibility':'hidden','display':'none'});
    $("#blocked").css({'height':'0px','visibility':'hidden','display':'none'});
    $("#coverimage").css({'visibility':'visible','display':'block'});
    $("#coverimage").attr("src","missing.jpg");
    $("#nowplaying").text("No Song Loaded");
    console.log("lines length: "+lines.length);
    songindex++;
    if(songindex<=lines.length-1){
        playnext=true;
        checkSource(lines[songindex]);}else{
        getSongs(0);}
  }
}
function stopVideo() {
  player.stopVideo();
}

      //Player Controls
$("#pause").click(function(){
  if (!done){
  if (player.getPlayerState()!=0 && player.getPlayerState()==1){
  console.log("PAUSE");
  playing=false;
  player.pauseVideo();
  getInfo();
  }}
});

$("#play").click(function(){
  if (!done){
  if (player.getPlayerState()!=0 && player.getPlayerState()==2){
  console.log("PLAY");
  playing=true;
  player.playVideo();
  getInfo();
  }}
});

$("#next").click(function(){
  if (!done){
    if(songindex+1<=lines.length-1){
    done = true;
    playnext=true;
    console.log("end playback");
    $("#player").css({'height':'0px','visibility':'hidden','display':'none'});
    $("#blocked").css({'height':'0px','visibility':'hidden','display':'none'});
    $("#coverimage").css({'visibility':'visible','display':'block'});
    $("#coverimage").attr("src","missing.jpg");
    $("#nowplaying").text("No Song Loaded");
    console.log("lines length: "+lines.length);
    songindex++;
    player.stopVideo();
        playnext=true;
        checkSource(lines[songindex]);}else{
        getSongs(1);}
  }
});

//Play video if api is loaded and player is ready
function playYt(){
  if (ready){
    done=false;
    $("#player").css({'height':'480px','visibility':'visible','display':'block'});
    $("#blocked").css({'height':'480px','visibility':'visible','display':'block'});
    $("#coverimage").css({'visibility':'hidden','display':'none'});
  player.loadVideoById(nextTrack);
  getInfo();

  }else{setTimeout(playYt,1000)}}
