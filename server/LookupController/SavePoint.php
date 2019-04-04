<?php
require_once "../Services/PointService.php";
require_once "../core.php";

$service = new PointService();
$response = $service->savePoint();
createResponse($response);