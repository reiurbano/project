<?php

include "config.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'];
    $password = $data['password'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {

        $record = $result->fetch_assoc();
        $hashedPassword = $record['password'];

        if (password_verify($password, $hashedPassword)) {
            $_SESSION['user_id'] = $record['id'];
            $response = array(
                'success' => true,
                'message' => 'Login Successful',
                'user_id' => $_SESSION['user_id']
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Password Incorrect!'
            );
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'Email not found.'
        );
    }
    echo json_encode($response);
} else {
    echo "Invalid Request";
}

?>