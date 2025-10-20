<?php
session_start();

$_SESSION = array();

// Destroy the session completely
session_destroy();

// Redirect the user back to the homepage
header("location: index.php");
exit; 
?>