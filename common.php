<?php

function redirect($link){
	    
		#Redirect
        header("Location: "."./".$link);
        die();}


function heading(){
    echo "    <head>
        <title>MuQuery</title>
        <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
        <link href='music.css' type='text/css' rel='stylesheet'/>
        </head>";}
    
?>

