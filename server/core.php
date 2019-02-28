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
?>