<?php
    include 'common.php';
    session_start();
if (!isset($_SESSION["roomid"])){
    if ($_POST["action"]=="previous"){
        if (file_exists($_POST["roomid"].".txt")){
            
            $_SESSION["roomid"]=$_POST["roomid"];
            redirect("mobile.php");}else{
                redirect("main_mobile.php");
            }
    }
}

?>
