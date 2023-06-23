<?php

session_start();

// Change with URL
header("Access-Control-Allow-Origin: null");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");

$cookie_options = array(
    'samesite' => 'None',
    'secure' => true
);

setcookie("PHPSESSID", session_id(), $cookie_options);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kodego_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
}

?>