<?php

include "config.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM tweets JOIN users ON users.user_id = tweets.user_id ORDER BY tweets.tweet_id DESC;";

    $results = $conn->query($sql);

    if ($results->num_rows > 0) {
        $tweets = array();

        while ($record = $results->fetch_assoc()) {
            
            ($record['user_id'] == $_SESSION['user_id']) ? $user = true : $user = false;

            $temp = array(
                'id' => $record['tweet_id'],
                'content' => $record['content'],
                'date' => $record['date_tweeted'],
                'firstname' => $record['firstname'],
                'lastname' => $record['lastname'],
                'user' => $user
            );

            $tweets[] = $temp;
        }

        echo json_encode($tweets);
    } else {
        echo "No posts found";
    }
}

?>