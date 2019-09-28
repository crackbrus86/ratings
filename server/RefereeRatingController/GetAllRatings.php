<?php
require_once "../Services/RefereeRatingService.php";
require_once "../core.php";

$service = new RefereeRatingService();
$response = $service->getAll();
createResponse($response);