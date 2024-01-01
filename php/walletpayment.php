<?php
session_start();
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
require('vendor/autoload.php');
include('userWallet.php');
include('config.php'); // Include your database configuration

use Razorpay\Api\Api;

$api_key = 'rzp_test_eCSo0HgQUUjnNb';
$api_secret = 'yq1doDG5JroEbxHUbEmxElPi';

$api = new Api($api_key, $api_secret);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $amount = $data['amount']; // Amount to be added to the wallet

    // Create an order with Razorpay
    $order = $api->order->create([
        'amount' => $amount * 100, // Razorpay accepts amounts in paise
        'currency' => 'INR', // Change as per your currency
        'receipt' => 'order_' . time(),
    ]);

    $orderId = $order->id;


    
    $userWallet = new UserWallet(12, 0, $conn);
    
    // if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
    
        $userWallet->deposit($amount);
        // $userWallet->withdraw(30);
    
        // Return updated balance and transaction history
        echo json_encode([
            'balance' => $userWallet->checkBalance(),
            'transactionHistory' => $userWallet->getTransactionHistory(),
            'orderId'=>$orderId
        ]);
    
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
