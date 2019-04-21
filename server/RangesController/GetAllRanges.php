<?php
require_once "../Services/RangeService.php";
require_once "../core.php";

$service = new RangeService();

$response = $service->getAll();

createResponse($response);