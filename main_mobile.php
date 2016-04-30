<!DOCTYPE html>
<?php
include 'common.php';
session_start();

if (isset($_SESSION["roomid"])){
     redirect("mobile.php");
}
?>

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
        <div id="mainmenu">
        <fieldset id="joinform">
            <form action="join_sess.php" method="post">
                <div id="forms">
                    <p>Room ID:</p>
                    <input type="number" name="roomid" min=1000 max=9999 required><br>
                    <input type="hidden" name="action" value="previous"><br>
                    <input type="submit" value="Enter Room"><br>
                </div>
            </form>
        </fieldset>
        </div>
        
    </body>
</html>