<?php
require_once "../Services/PointService.php";
require_once "../core.php";

$service = new PointService();
$response = $service->getAll();
createResponse($response);