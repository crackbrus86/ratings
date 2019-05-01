<?php
require_once "../Services/FstService.php";
require_once "../core.php";

$service = new FstService();

$response = $service->getAllFst();

createResponse($response);