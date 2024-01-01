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
if ($conn->connect_error) {
    $_SESSION["new"] = "new ";
    die("Connection failed: " . $conn->connect_error);
} 


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate the mobile and password
    if (isset($_POST["mobile"]) && isset($_POST["password"])) {
        $mobile = $_POST["mobile"];
        $password = $_POST["password"];

        $sql = "SELECT * FROM users WHERE mobile LIKE '%$mobile%'";
        $stmt = mysqli_query($conn, $sql);

        if (mysqli_num_rows($stmt) == 1) {
            $row = $stmt->fetch_assoc();
            $storedPassword = $row["password"];

            // Verify the password
            if (password_verify($password, $storedPassword)) {
                // Password is correct, create a session for the user
                // $hashedUserId = password_hash($row["userId"], PASSWORD_DEFAULT);
                $_SESSION["userId"] = $row["userId"];
                $_SESSION["id"] = $row["id"];
                
                setcookie("userId",$row["userId"] , time() + (86400 * 30), "/");
                // Send a JSON response indicating success
                echo json_encode(['success' => true]);
                exit;
            } else if (password_verify($password, $storedPassword)) {
                // mobile not verified
                echo json_encode(['error' => 'mobile is not verified. Check mobile']);
                exit;
            } else {
                // Invalid password
                echo json_encode(['error' => 'Invalid mobile or password.']);
                exit;
            }
        } else {
            // User not found
            echo json_encode(['error' => 'Invalid mobile or password.']);
            exit;
        }
    } else {
        // Empty mobile or password
        echo json_encode(['error' => 'Please enter your mobile and password.']);
        exit;
    }
}

$conn->close();
?>
