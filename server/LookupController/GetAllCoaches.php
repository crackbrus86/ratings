<?php
require_once "../Services/CoachService.php";
require_once "../core.php";

$service = new CoachService();

$response = $service->getCoachesLookup();

createResponse($response);