<?php
function createResponse($data, $status = true, $message = "")
{
    $response = getResponseModel();
    $response->status = $status;
    $response->message = $message;
    $response->data = $data;
    echo json_encode($response);
}

function escape($string){
    return strip_tags(stripslashes($string));
}

function dispatchDate($dateString){
    return substr($_POST["eventDate"], 0, strpos($_POST["eventDate"], '('));
}

function convertToDate($dateString){
    return date('Y-m-d', strtotime(dispatchDate($dateString)));
}

function reverseDate($date){
    return date('m-d-Y', strtotime($date));
}

function convertToDateYear($dateString){
    return date('Y', strtotime(dispatchDate($dateString)));
}

function getResponseModel(){
    $response = new stdClass();
    $response->status = TRUE;
    $response->message = NULL;
    $response->data = NULL;
    return $response;
}
?>