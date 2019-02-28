<?php
require_once "../Services/PointService.php";
require_once "../core.php";

$service = new PointService();
$service->savePoint();
createResponse(null, true, "Збережено вдало");