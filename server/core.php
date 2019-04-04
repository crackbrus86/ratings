<?php
function createResponse(ResponseModel $response)
{
    echo json_encode($response);
}

function escape($string)
{
    return strip_tags(stripslashes($string));
}

function dispatchDate($dateString)
{
    return substr($dateString, 0, strpos($dateString, '00:00:00') + 8);
}

function convertToDate($dateString)
{
    return date('Y-m-d', strtotime(dispatchDate($dateString)));
}

function reverseDate($date)
{
    return date('m-d-Y', strtotime($date));
}

function convertToDateYear($dateString)
{
    return date('Y', strtotime(dispatchDate($dateString)));
}

class ResponseModel
{

    public $status;

    public $message;

    public $data;

    public function __construct()
    {
        $this->status = FALSE;

        $this->data = NULL;

        $this->message = NULL;
    }

    public function setResponseModel(stdClass $response)
    {
        $this->status = $response->status;

        $this->data = $response->data;

        $this->message = $response->message;
    }
}

function mapPostToObject($object = NULL)
{
    if(!is_object($object))
    {
        $object = new stdClass();
    }

    foreach ($_POST as $key => $value) 
    {
        $object->{$key} = escape($value);
    }

    return $object;
}

function mapMySQLResultToObject($result, $object)
{
    if(!is_object($result)) return;

    if(!is_object($object))
    {
        $object = new stdClass();
    }

    foreach ($result as $key => $value) 
    {
        $object->{lcfirst($key)} = $value;
    }

    return $object;
}
?>