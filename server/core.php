<?php
function createResponse($data, $status = true, $message = "")
{
    $response = new stdClass();
    $response->status = $status;
    $response->message = $message;
    $response->data = $data;
    echo json_encode($response);
}

function escape($string){
    return strip_tags(stripslashes($string));
}

function convertDate($dateString){
    $dispatchDate = substr($_POST["eventDate"], 0, strpos($_POST["eventDate"], '('));
    return date('Y-m-d', strtotime($dispatchDate));
}
?>