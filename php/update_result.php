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

    $sqlFetchPendingGames = "SELECT * FROM game WHERE  result IS NULL";
    $stmtFetchPendingGames = $conn->prepare($sqlFetchPendingGames);
    $stmtFetchPendingGames->execute();
    $resultFetchPendingGames = $stmtFetchPendingGames->get_result();
    $randomResult = rand(0, 2);
    $currentDateTime = date('Y-m-d H:i:s');

    $sqlInsertResult = "INSERT INTO result (colorCode, created_at) VALUES (?, ?)";
    $stmtInsertResult = $conn->prepare($sqlInsertResult);
    $stmtInsertResult->bind_param("ss", $randomResult, $currentDateTime);
    $stmtInsertResult->execute();


    if ($resultFetchPendingGames->num_rows > 0) {
        while ($gameRow = $resultFetchPendingGames->fetch_assoc()) {
            $id = $gameRow['id'];
            $userSelectedCode = $gameRow['colorCode'];
            $amount = $gameRow['amount'];

            // Simulate a result based on 0, 1, 2
      

            // Update the game entry with the simulated result
            $sqlUpdateGame = "UPDATE game SET result = ? WHERE id = ?";
            $stmtUpdateGame = $conn->prepare($sqlUpdateGame);
            $stmtUpdateGame->bind_param("ss", $randomResult, $id);
            $stmtUpdateGame->execute();

            if ($randomResult == $userSelectedCode) {
                // Simulate adding balance for a win (replace this with your actual logic)
                $sqlUpdateBalance = "UPDATE users SET balance = balance + $amount WHERE userId = ?";
                $stmtUpdateBalance = $conn->prepare($sqlUpdateBalance);
                $stmtUpdateBalance->bind_param("s", $userId);
                $stmtUpdateBalance->execute();
            }
        }

        echo json_encode(['status' => 'success', 'message' => 'Pending game entries for the user updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No pending game entries found for the user']);
    }

    // Close the statement
    $stmtFetchPendingGames->close();

// Close the database connection
$conn->close();
?>
