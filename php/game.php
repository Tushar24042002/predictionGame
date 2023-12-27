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
include 'config.php';

$response = [];

try {
    // Check if the required parameters are present in the POST request
    if (
        isset($_POST['colorCode']) &&
        isset($_POST['userId']) &&
        isset($_POST['amount']) &&
        isset($_POST['gameSerial']) &&
        isset($_POST['timeInterval'])
    ) {
        // Log received data (for debugging purposes)
        error_log(print_r($_POST, true));

        // Retrieve data from the POST request
        $colorCode = $_POST['colorCode'];
        $userId = $_POST['userId'];
        $amount = $_POST['amount'];
        $gameSerial = $_POST['gameSerial'];
        $timeInterval = $_POST['timeInterval'];

        // Assuming 'name' is a parameter in your SQL query
        $stmt = $conn->prepare("INSERT INTO game (colorCode, userId, amount, gameSerial, timeInterval) VALUES (?, ?, ?, ?, ?)");

        // Bind parameters
        $stmt->bind_param('isiss', $colorCode, $userId, $amount, $gameSerial, $timeInterval);

        $stmt->execute();

        $response['success'] = true;
        $response['message'] = "Data inserted successfully";
    } else {
        $response['success'] = false;
        $response['message'] = "Missing required parameters in the POST request";
    }
} catch (PDOException $e) {
    $response['success'] = false;
    $response['message'] = "Error inserting data: " . $e->getMessage();
} finally {
    // Close the database connection
    $conn = null;
}

// Return a JSON response with CORS headers
echo json_encode($response);
?>
