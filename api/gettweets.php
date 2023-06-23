<?php

include "config.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM tweets JOIN users ON users.id = tweets.user_id ORDER BY tweets.id DESC;";

    $results = $conn->query($sql);

    if ($results->num_rows > 0) {
        $tweets = array();

        while ($record = $results->fetch_assoc()) {
            $temp = array(
                'id' => $record['id'],
                'content' => $record['content'],
                'date' => $record['date_tweeted'],
                'firstname' => $record['firstname'],
                'lastname' => $record['lastname'],
            );
            $tweets[] = $temp;
        }

        echo json_encode($tweets);
    } else {
        echo "No posts found";
    }
}

?>