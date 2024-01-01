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

        // Check if user balance is sufficient
        $stmtBalance = $conn->prepare("SELECT balance FROM users WHERE userId = ?");
        $stmtBalance->bind_param('i', $userId);
        $stmtBalance->execute();
        $stmtBalance->bind_result($userBalance);
        $stmtBalance->fetch();

        if ($userBalance >= $amount) {
            // Deduct amount from user's balance
            $newBalance = $userBalance - $amount;
            $stmtUpdateBalance = $conn->prepare("UPDATE users SET balance = ? WHERE userId = ?");
            $stmtUpdateBalance->bind_param('ii', $newBalance, $userId);
            $stmtUpdateBalance->execute();

            // Insert game data
            $stmtInsertGame = $conn->prepare("INSERT INTO game (colorCode, userId, amount, gameSerial, timeInterval) VALUES (?, ?, ?, ?, ?)");
            $stmtInsertGame->bind_param('isiss', $colorCode, $userId, $amount, $gameSerial, $timeInterval);
            $stmtInsertGame->execute();

            $response['success'] = true;
            $response['message'] = "Data inserted successfully";
        } else {
            $response['success'] = false;
            $response['message'] = "Insufficient balance";
        }

        $stmtBalance->close();
        $stmtUpdateBalance->close();
        $stmtInsertGame->close();
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
