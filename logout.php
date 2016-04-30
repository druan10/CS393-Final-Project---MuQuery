<?php
include 'common.php';
session_start();
session_destroy();
session_regenerate_id(TRUE);
redirect("index.html");
?>