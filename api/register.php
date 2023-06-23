<?php

include "config.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $firstname = $data['firstname'];
    $lastname = $data['lastname'];
    $email = $data['email'];
    $birthdate = $data['birthdate'];
    $password = $data['password'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows == 0) {
        $password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (firstname, lastname, email, birthdate, password)
                VALUES ('$firstname', '$lastname', '$email', '$birthdate', '$password');";

        if ($conn->query($sql)) {
            $response = array(
                'success' => true,
                'message' => 'Registration Successful'
            );
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'Email already has an account.'
        );
    }
    echo json_encode($response);
} else {
    echo "Invalid Request";
}

?>