<?php
// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true'); 

// Example: check_auth.php

session_start();

// Check if the user is logged in
if(isset($_SESSION['userId'])) {
    $response = array('loggedIn' => true, 'userId' => $_SESSION['userId']);
} else {
    $response = array('loggedIn' => true);
}

header('Content-Type: application/json');
echo json_encode($response);

?>