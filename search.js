 SC.initialize({
    client_id: "a52ad8c9bea7fc1421b4886e5c8ce670",
  });

var search = new Array;
var clicked=false;
function searchSongs(query){
// find all sounds with this query
SC.get('/tracks', {q: query}).then(function(tracks) {
    $("#searchresults").css({"visibility":"visible","display":"block"});
    search=tracks;
    $("#searchheader").html("<h1>Search Results</h1>");
    $("#searchresults").html("");
    
    if (search.length>0){
    for (i=0;i<search.length;i++){
        var obj=search[i];
        
        var cover=obj["artwork_url"];
        
        if (cover==null){
        cover=track.user["avatar_url"];
        }
        //Create links
        //$("#searchresults").append("<a class='result' href='#' num='" + i + "'>"+obj.user["username"]+": "+obj["title"]+"</a><br>")
        $("#searchresults").append("<div class='result'><img  src='"+cover+"' alt='cover'><a href='#' num='" + i + "'>"+obj.user["username"]+": "+obj["title"]+"</a></div>");
        
        $('a').click(function(event){
        if (!clicked){
            clicked=true;
        event.preventDefault();
        var obj=search[$(this).attr("num")];
        $.ajax({url: 'addSong.php',
        data: {url: obj["permalink_url"]},
        type: 'post',
        success: function(event){
            window.location.replace("mobile.php");  
            }
        });
        }
    });

    }}else{
        $("#searchresults").append("<h2>No Results</h2>");
        $("#searchresults").css({"height":"68px"});
    }
    
});
}
$("#scsearch").submit(function(event) {
    event.preventDefault();
    searchSongs($("#scquery").val());
});

//Youtube Search
$("#ytsearch").submit(function(event) {
    event.preventDefault();
    searchYt($("#ytquery").val());
});

function searchYt(query){
    $("#searchresults").css({"visibility":"visible","display":"block","height":"250px"});
    $("#searchheader").html("<h1>Search Results</h1>");
    $("#searchresults").html("");
  $.get(
      "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet',
      q: query,
      maxResults: '10',
      type: 'video',
      videoCategoryId: '10',
      key: 'AIzaSyBR8jZq8GALRNQjIFuVjeLG9ocTrV1xQcQ'
    },function(data){console.log(data);
    search=data.items;
        if (data.items.length>0){
            console.log("success");
            for (var i=0;i<data.items.length;i++){
                var obj=data.items[i];
                var cover=obj.snippet.thumbnails.medium.url;
                console.log(cover);
                var name=obj.snippet.title;
                $("#searchresults").append("<div class='result'><img id='ytimage' src='"+cover+"' alt='cover'><a href='#' num='" + i + "'>"+name+"</a></div>");
                    
                    $('a').click(function(event){
                    if (!clicked){
                        clicked=true;
                    event.preventDefault();
                    var obj2=search[$(this).attr("num")];
                    $.ajax({url: 'addSong.php',
                    data: {url: obj2.id.videoId},
                    type: 'post',
                    success: function(event){
                        window.location.replace("mobile.php");  
                        }
                    });
                    }
                });
                
            }
        }else{
            $("#searchresults").append("<h2>No Results</h2>");
            $("#searchresults").css({"height":"68px"});
        }
    }
  );
}
