<?php
include 'config.php';
include 'UserWallet.php';

$userWallet = new UserWallet(1, 0, $conn);

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    // $amount = $data['amount'];
    $amount = 20;

    $userWallet->deposit($amount);
    $userWallet->withdraw(30);

    // Return updated balance and transaction history
    echo json_encode([
        'balance' => $userWallet->checkBalance(),
        'transactionHistory' => $userWallet->getTransactionHistory(),
    ]);
// } else {
//     echo json_encode(['error' => 'Invalid request method']);
// }
?>
