<?php
require "../Services/CompetitionService.php";
require "../core.php";

$service = new CompetitionService();
$competitions = $service->getAll();
createResponse($competitions);