<!DOCTYPE html>
<?php
include 'common.php';
session_start();
if (isset($_SESSION["roomid"])){
     redirect("player.php");
}
?>

<html>
    <?php heading()?>
    <p id="maintitle">
        MuQuery
    </p>
    
    <h1 id="slogan">
        Soundcloud & Youtube combined
    </h1>
    
    <body>
        <div #id="mainmenu">
        
            <form action="create_sess.php" method="post">
                <div id="mainmenu">
                    <input type="hidden" name="action" value="new">
                    <input type="submit" value="New Room"><br>
                </div>
            </form>
            <br>
            <!--
            <form action="create_sess.php" method="post">
                <div id="mainmenu">
                    <input type="number" id="roomid" name="roomidsearch" min=1000 max=9999 required><br>
                    <input type="hidden" name="action" value="previous"><br>
                    <input type="submit" value="Join Existing Room"><br>
                </div>
            </form>
            -->
        </div>
        
    </body>
</html>