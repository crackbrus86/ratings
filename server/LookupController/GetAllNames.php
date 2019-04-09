<?php
require_once "../Services/NameService.php";
require_once "../core.php";

$service = new NameService();

$response = $service->getAllNames();

createResponse($response);

