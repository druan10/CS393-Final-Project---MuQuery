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
    <?php heading()?>
    <body>
    <p id="playertitle">
        MuQuery
    </p>

    <div id="mainmenu">
        <h2>ROOM: <?=$_SESSION["roomid"]?></h2>
        <fieldset id="playercontrols">
            <legend>Player Controls</legend>
            <button class="controls" id="play">PLAY</button>
            <button class="controls" id="pause">PAUSE</button>
            <button class="controls" id="next">NEXT</button>
        </fieldset>
        <br>
        <p id="nowplaying">No Song Loaded</p>
            <div id="blocked">
                <div id="player"></div>
            </div>
        <!-- No longer needed
        <form id="surl">
          <div>
            <input type="text" id="url" placeholder="SoundCloud Track Url"/>
            <input type="submit">
          </div>
        </form>-->
        <img src="missing.jpg" alt="missing" id="coverimage">
        <br>
        <fieldset>
            <legend>Room Controls</legend>
            <form action="logout.php" method="post">
            <input type="submit" value="Exit Room"><br>
            </form>
        </fieldset>
    </div>
    </body>

    <script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>
    var roomid = <?php echo(json_encode($_SESSION["roomid"])); ?>;
    </script>
    <script src="controller.js"></script>
    <script src="soundcloud.js"></script>
    <script src="youtube.js"></script>


</html>




