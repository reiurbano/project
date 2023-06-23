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
                'message' => 'Login Successful'
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
}

// if ($_SERVER['REQUEST_METHOD'] == 'GET' && !isset($_GET['id'])) {
//     $valid = false;

//     if (isset($_SESSION['user_id'])) {
//         $valid = true;
//         $response = array(
//             'success' => true,
//             'valid' => $valid,
//             'user_id' => $_SESSION['user_id']
//         );
//     } else {
//         $response = array(
//             'success' => false,
//             'valid' => $valid
//         );
//     }

//     echo json_encode($response);
// }

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "SELECT * FROM users WHERE id = '$id';";

    $result = $conn->query($sql);
    $record = $result->fetch_assoc();

    $user = array(
        'id' => $record['id'],
        'firstname' => $record['firstname'],
        'lastname' => $record['lastname'],
        'email' => $record['email'],
        'birthdate' => $record['birthdate']
    );

    $response = array(
        'success' => true,
        'user' => $user
    );

    echo json_encode($response);
}

?>