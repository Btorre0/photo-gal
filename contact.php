<?php
$host = "localhost";
$dbname = "contact_form_db";
$username = "your_database_user";
$password = "your_database_password";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'] ?? '';
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$message = $_POST['message'] ?? '';

if (!$email) {
    die("Invalid email format.");
}

if (empty($name) || empty($message)) {
    die("All fields are required.");
}

$stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
