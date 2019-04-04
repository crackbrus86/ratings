<?php
require_once "../Services/RecordService.php";
require_once "../core.php";

$service = new RecordService();
$response = $service->getAll();
createResponse($response);