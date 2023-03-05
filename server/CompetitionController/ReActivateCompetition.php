<?php
require_once "../Services/CompetitionService.php";
require_once "../core.php";

$service = new CompetitionService();

$response = $service->re_activate_competition();

createResponse($response);