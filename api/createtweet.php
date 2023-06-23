<?php

include "config.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $content = $data['content'];
    $date = date('Y-m-d');
    $user = $_SESSION['user_id'];

    $sql = "INSERT INTO tweets (content, date_tweeted, user_id) VALUES ('$content', '$date', '$user');";

    if ($conn->query($sql)) {
        $response = array(
            'success' => true,
            'message' => 'Sent Successfully.'
        );
    } else {
        $response = array(
            'success' => false,
            'message' => 'Sent Unsuccessfully.'
        );
    }
    echo json_encode($response);
} else {
    echo "Invalid Request";
}

?>