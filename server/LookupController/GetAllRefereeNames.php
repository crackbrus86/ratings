<?php
require_once "../Services/RefereeNameService.php";
require_once "../core.php";

$service = new RefereeNameService();
$response = $service->getAll();
createResponse($response);