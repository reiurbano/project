<?php

include "config.php";

session_unset();
session_destroy();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $response = array(
        'success' => true,
        'message' => "You have logged out."
    );

    echo json_encode($response);
}

?>