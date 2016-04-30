<?php
include 'common.php';
session_start();

//Test for Soundcloud Link
$subject = $_POST["url"];
$pattern = '/(https:\/\/soundcloud.com\/)[a-z|\-|\_|\d]*[\/][a-z|\-|\_|\d]*[\s]?/';
preg_match($pattern, $subject, $matches);

if ($matches[0]!=""){
    $file=fopen($_SESSION["roomid"].".txt", "a");
    fwrite($file,PHP_EOL);
    fwrite($file,$matches[0]);
    fclose($file);
}else{
    //Test for Youtube Id
    $pattern = '/[a-z|\d|\_|\-]{11}/i';
    preg_match($pattern, $subject, $matches);
    
    if ($matches[0]!=""){
    $file=fopen($_SESSION["roomid"].".txt", "a");
    fwrite($file,PHP_EOL);
    fwrite($file,$matches[0]);
    fclose($file);
    }
}

fclose($file);
redirect("mobile.php");
?>

