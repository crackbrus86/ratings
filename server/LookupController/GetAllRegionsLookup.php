<?php
require_once "../Services/RegionService.php";
require_once "../core.php";

$service = new RegionService();

$response = $service->getAll();

createResponse($response);
?>