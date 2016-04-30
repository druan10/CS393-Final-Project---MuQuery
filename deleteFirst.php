<?php
if (isset($_POST["roomid"]))
$playlist=file($_POST["roomid"].".txt");
$file=fopen($_POST["roomid"].".txt");
fwrite($file,"");
fclose($file);
$file=fopen($_POST["roomid"].".txt","a");
fwrite($file,$playlist[0]);
fwrite($file,$playlist[1]);
for ($i=3;$i<count($playlist)-1;$i++){
fwrite($file,$playlist[$i]);}
fclose($file);
?>