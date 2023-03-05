<?php
require_once "../Services/CompetitionService.php";
require_once "../core.php";

$service = new CompetitionService();

$response = $service->get_active_competitions();

createResponse($response);