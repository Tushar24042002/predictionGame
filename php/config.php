<?php


    $db_host = "localhost";
    $db_username = "vhfaxmrm_tushar";
    $db_password = "Tushar@2002";
    $db_name = "vhfaxmrm_tushar";

    

    $conn = mysqli_connect("localhost", "root", "", "game");

    // $conn = mysqli_connect($db_host, $db_username, $db_password, $db_name);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>