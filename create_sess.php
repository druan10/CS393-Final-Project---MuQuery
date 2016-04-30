<?php
include 'common.php';
    session_start();
    
if (!isset($_SESSION["roomid"])){
    //New room button was selected
    if ($_POST["action"]=="new"){
        $rand=rand(1000,9999);
        if (!file_exists($rand.".txt")){
            $_SESSION["roomid"]=$rand;
            $file=fopen($_SESSION["roomid"].".txt", "a");
            fwrite($file, '2'.PHP_EOL);
            fwrite($file, '0');
            fclose($file);
            redirect("player.php");
            }
        }
    //Enter room button was selected
    if ($_POST["action"]=="previous"){
        if (file_exists($_POST["roomid"].".txt")){
            $_SESSION["roomid"]=$_POST["roomid"];
            redirect("player.php");}else{
                redirect("index.php");
            }
    }
}
else{
    redirect("create_sess.php");
}
?>
