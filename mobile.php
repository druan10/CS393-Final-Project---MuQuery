<?php
    include 'common.php';
    session_start();
    $playlist=file($_SESSION["roomid"].".txt");
    if (!isset($_SESSION["roomid"])){
        redirect("index.html");
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>MuQuery-Mobile</title>
        <link href='mobile.css' type='text/css' rel='stylesheet'/>
        <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h1>
            MuQuery-Mobile
        </h1>
        <h2>ROOM: <?=$_SESSION["roomid"]?></h2>
        <div id="forms">
            <!--
            <form action="addSong.php" method="post">
                <input type="text" name="url" placeholder="SoundCloud Track Url"  required/><br>
                <input type="submit" value="Submit">
            </form>
            <br>-->
                 <!-- Search Bar -->
            <form id="scsearch">
              <div>
                <input type="text" id="scquery" placeholder="Search For Songs on SoundCloud" required/><br>
                <input type="submit">
              </div>
            </form>
            <br>
            <form id="ytsearch">
              <div>
                <input type="text" id="ytquery" placeholder="Search For Songs on Youtube" required/><br>
                <input type="submit">
              </div>
            </form>
            <br>
            <form action="logout.php" method="post">
                <input type="submit" value="Exit Room">
            </form>
            <br>
        </div>
        <div id="searchheader"></div>
        <div id="searchresults"></div>
        <h2>Current Playlist</h2>
        <div id="playlist">
        <?php 
            for ($i=2;$i<count($playlist);$i++){
                echo "<p>".($i-1).": ".$playlist[$i]."</p>";}?>
        </div>
    </body>
    <script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="search.js"></script>
    
</html>