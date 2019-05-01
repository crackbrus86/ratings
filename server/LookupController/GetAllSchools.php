<?php
require_once "../Services/SchoolService.php";
require_once "../core.php";

$service = new SchoolService();

$response = $service->getAllSchools();

createResponse($response);