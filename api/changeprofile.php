<?php

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $_SESSION['user_id'];
    $firstname = $data['firstname'];
    $lastname = $data['lastname'];
    $email = $data['email'];
    $birthdate = $data['birthdate'];

    $sql = "SELECT * FROM users WHERE user_id = '$id';";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $sql = "UPDATE users SET firstname = '$firstname', lastname = '$lastname', email = '$email', birthdate = '$birthdate' WHERE user_id = '$id';";

        if ($conn->query($sql)) {
            $response = array(
                'success' => true,
                'message' => 'Update Successful'
            );
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'User not Found'
        );
    }
    echo json_encode($response);
} else {
    echo 'Invalid Request';
}

?>