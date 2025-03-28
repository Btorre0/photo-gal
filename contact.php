<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Sanitize input from form
$name = $_POST['name'] ?? '';
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$message = $_POST['message'] ?? '';
$ip_address = $_SERVER['REMOTE_ADDR']; // Capture sender's IP

// Basic validation
if (!$email) {
    die("Invalid email format.");
}

if (empty($name) || empty($message)) {
    die("All fields are required.");
}

/*
// DATABASE CONNECTION 
// will continue this later on:
// plan on inserting the data into a database
$host = ""; // your DB host, e.g., "localhost"
$dbname = "contact_form_db";
$username = ""; // your DB username
$password = ""; // your DB password

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO contacts (name, email, message, ip_address) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $message, $ip_address);

if (!$stmt->execute()) {
    echo "Error saving to database: " . $stmt->error;
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->close();
$conn->close();
*/

// Prepare email content
$to = "marshytwt@gmail.com";
$subject = "New Contact Form Submission";
$body = "You've received a new message:\n\n"
      . "Name: $name\n"
      . "Email: $email\n"
      . "IP Address: $ip_address\n\n"
      . "Message:\n$message";
$headers = "From: photo-gal@interests.com\r\nReply-To: $email";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "success";
} else {
    echo "Email failed to send.";
}
?>
