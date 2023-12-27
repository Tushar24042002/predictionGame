<?php
class UserWallet {
    private $userId;
    private $balance;
    private $transactionHistory = [];
    private $conn;

    public function __construct($userId, $initialBalance = 0, $conn) {
        $this->userId = $userId;
        $this->balance = $initialBalance;
        $this->conn = $conn;
    }

    public function checkLastBalance() {
        $sql = "SELECT balance FROM users WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param('i', $this->userId);
        $stmt->execute();
        $stmt->bind_result($lastBalance);
        $stmt->fetch();
        $stmt->close();

        return $lastBalance ?? 0;
    }

    public function deposit($amount) {
        $lastBalance = $this->checkLastBalance();
        $this->balance = $lastBalance + $amount;
        $this->addToTransactionHistory('Deposit', $amount);
        $this->updateUserBalance();
    }

    public function withdraw($amount) {
        $lastBalance = $this->checkLastBalance();
        if ($amount <= $lastBalance) {
            $this->balance = $lastBalance - $amount;
            $this->addToTransactionHistory('Withdrawal', $amount);
            $this->updateUserBalance();
            return true; // Withdrawal successful
        } else {
            return false; // Insufficient funds
        }
    }

    public function checkBalance() {
        return $this->balance;
    }

    public function getTransactionHistory() {
        return $this->transactionHistory;
    }

    private function addToTransactionHistory($type, $amount) {
        $timestamp = time();
        $this->transactionHistory[] = [
            'type' => $type,
            'amount' => $amount,
            'timestamp' => $timestamp,
        ];

        $this->insertTransactionIntoDatabase($type, $amount, $timestamp);
    }

    private function updateUserBalance() {
        $sql = "UPDATE users SET balance = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param('ii', $this->balance, $this->userId);
        $stmt->execute();
        $stmt->close();
    }

    private function insertTransactionIntoDatabase($type, $amount, $timestamp) {
        $sql = "INSERT INTO transactions (user_id, transaction_type, amount, timestamp) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param('isii', $this->userId, $type, $amount, $timestamp);
        $stmt->execute();
        $stmt->close();
    }
}
?>
