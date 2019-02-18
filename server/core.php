<?php
function createResponse($data, $status = true, $message = "")
{
    $response = new stdClass();
    $response->status = $status;
    $response->message = $message;
    $response->data = $data;
    echo json_encode($response);
}
?>