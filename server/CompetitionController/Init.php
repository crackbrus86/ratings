<?php
require_once "../Services/CompetitionService.php";
require_once "../core.php";

$service = new CompetitionService();

$response = $service->initial_creation();

createResponse($response);