<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
include 'config.php';

// Get user ID from the session (you can use POST, GET, or any other method)
$userId = $_SESSION['userId']; // Adjust as needed

// Fetch data from the game table based on user ID with ordering by a specific column (e.g., id) in descending order
$sql = "SELECT * FROM game WHERE userId = $userId ORDER BY id DESC";
$result = $conn->query($sql);

// Convert the result to an associative array
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);

// Close the database connection
$conn->close();
?>
