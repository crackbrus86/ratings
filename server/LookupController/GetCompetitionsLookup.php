<?php
require_once "../Services/CompetitionService.php";
require_once "../core.php";

$service = new CompetitionService();
$competitions = $service->getAll();
createResponse($competitions);