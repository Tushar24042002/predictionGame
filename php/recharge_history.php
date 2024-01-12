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
// $userId = $_SESSION['userId']; 
$userId = 12;

// Use prepared statements to prevent SQL injection
$sql = "SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC";

// Prepare the statement
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die('Error in preparing the SQL statement.');
}

// Bind the parameter
$stmt->bind_param('i', $userId); // Assuming $userId is an integer, adjust the type ('i' for integer, 's' for string, etc.)

// Execute the statement
$stmt->execute();

// Get the result set
$result = $stmt->get_result();

// Convert the result to an associative array
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);

// Close the statement and the database connection
$stmt->close();
$conn->close();
?>
