<?php
require_once "../Services/RecordService.php";
require_once "../core.php";

$service = new RecordService();
$records = $service->getAll();
createResponse($records);