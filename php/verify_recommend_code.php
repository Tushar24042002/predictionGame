<?php
include 'config.php'; // Include your database configuration file

function validateRecommendCode($recommendCode) {
    global $conn;

    // Check if the recommendation code exists in the users table
    $codeCheckSql = "SELECT * FROM users WHERE recommend_code = '$recommendCode'";
    $codeCheckResult = mysqli_query($conn, $codeCheckSql);

    if (mysqli_num_rows($codeCheckResult) > 0) {
        // Recommendation code is valid, add 10 to the customer's account
        $row = mysqli_fetch_assoc($codeCheckResult);
        $userId = $row['userId'];

        // Update the user's account balance
        $updateBalanceSql = "UPDATE users SET balance = balance + 10 WHERE userId = '$userId'";
        if (mysqli_query($conn, $updateBalanceSql)) {
            return true; // Valid recommendation code, and account updated successfully
        } else {
            return false; // Valid recommendation code, but failed to update account
        }
    } else {
        return false; // Invalid recommendation code
    }
}


?>
