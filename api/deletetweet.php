<?php

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $tweet_id = $_GET['id'];

    $sql = "SELECT * FROM tweets WHERE user_id = '$user_id' AND tweet_id = '$tweet_id';";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $sql = "DELETE FROM tweets WHERE tweet_id = '$tweet_id';";

        if ($conn->query($sql)) {
            $response = array(
                'success' => true,
                'message' => 'Tweet Deleted'
            );
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'No Tweets Found'
        );
    }
    echo json_encode($response);
} else {
    echo 'Invalid Request';
}

?>