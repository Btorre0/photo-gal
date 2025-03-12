<?php

$name = $_POST['name'];
$email = $filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$subject = $_POST['subject'];
$message = $_POST['message']; 
$terms = filter_input(INPUT_POST, 'terms', FILTER_VALIDATE_BOOLEAN);

if ( ! $terms) {
    die('You must agree to the terms');
}

var_dump($name, $email, $subject, $message);
