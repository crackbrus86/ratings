<?php
require_once "../Services/CompetitionTypeService.php";
require_once "../core.php";

$service = new CompetitionTypeService();

$response = $service->getAll();

createResponse($response);