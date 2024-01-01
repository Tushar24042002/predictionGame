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

// Function to get user information by user ID
function getUserInfoById($userId) {
    global $conn; // Assuming $conn is your database connection

    // Prevent SQL injection
    $userId = mysqli_real_escape_string($conn, $userId);

    // Query to get user information by user ID
    $sql = "SELECT * FROM users WHERE userId = '$userId'";
    $result = mysqli_query($conn, $sql);

    // Check if the query was successful
    if ($result) {
        // Check if the user with the given ID exists
        if (mysqli_num_rows($result) > 0) {
            // Fetch user information
            $userInfo = mysqli_fetch_assoc($result);

            // You can return the user information as an associative array
            return $userInfo;
        } else {
            // User not found
            return null;
        }
    } else {
        // Query failed
        return null;
    }
}

// Example usage of the function
// This is just an example; you might call this function from an API endpoint
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $userIdStored = $_SESSION['userId'] ?? '65900d6246890';

    if (isset($userIdStored)) {
        
        $userInfo = getUserInfoById($userIdStored);
        if ($userInfo !== null) {
            echo json_encode($userInfo);
        } else {
            echo json_encode(['error' => 'User not found or query failed.']);
        }
    } else {
        echo json_encode(['error' => 'User ID not set in session.']);
    }
}
?>
