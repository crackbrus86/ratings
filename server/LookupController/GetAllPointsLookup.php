<?php
require_once "../Services/PointService.php";
require_once "../core.php";

$service = new PointService();
$points = $service->getAll();
createResponse($points);