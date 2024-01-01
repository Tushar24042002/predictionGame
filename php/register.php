<?php
include 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true'); 

include 'verify_recommend_code.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



function generate8DigitCodeWithLetters() {
    // Define the character set
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';

    // Get the length of the character set
    $charLength = strlen($characters);

    // Initialize the code
    $code = '';

    // Generate an 8-digit code
    for ($i = 0; $i < 8; $i++) {
        // Append a random character from the set
        $code .= $characters[rand(0, $charLength - 1)];
    }

    return $code;
}





if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate the username, mobile, and password
    if (isset($_POST["username"]) && isset($_POST["mobile"]) && isset($_POST["password"]) && isset($_POST["re_code"])) {
        $username = $_POST["username"];
        $mobile = $_POST["mobile"];
        $password = $_POST["password"];
        $verifyCode = $_POST["re_code"];


if (!validateRecommendCode($verifyCode)) {
    echo json_encode(['re_code' => "Invalid recommendation code or failed to update account."]);
    exit; 
}


        // Validate mobile length (you can customize this)
        if (strlen($mobile) != 10) {
            echo json_encode(['mobile' => 'Mobile must be only 10 characters long.']);
            exit;
        }

        // Validate password length (you can customize this)
        if (strlen($password) < 8) {
            echo json_encode(['password' => 'Password must be at least 8 characters long.']);
            exit;
        }





        // Check if the mobile already exists in the database
        $checkMobileSql = "SELECT * FROM users WHERE mobile LIKE '%$mobile%'";
        $checkMobileResult = mysqli_query($conn, $checkMobileSql);

        if (mysqli_num_rows($checkMobileResult) > 0) {
            echo json_encode(['error' => 'Mobile number already exists.']);
            exit;
        }

        // Hash the password before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $userId = uniqid();

        $re_code_gen = generate8DigitCodeWithLetters();
        // Insert the new user into the database
        $sql = "INSERT INTO users (username, mobile, password, balance, userId, recommend_code) VALUES ('$username', '$mobile', '$hashedPassword', 0, '$userId', '$re_code_gen')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true]);
            exit;
        } else {
            echo json_encode(['error' => 'Error creating user: ' . $conn->error]);
            exit;
        }
    } else {
        // Empty fields
        echo json_encode(['error' => 'Please enter your username, mobile, and password.']);
        exit;
    }
}

$conn->close();
?>
