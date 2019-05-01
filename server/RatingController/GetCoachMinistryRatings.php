<?php
require_once "../Services/RatingService.php";
require_once "../core.php";

$services = new RatingService();

$response = $services->getCoachMinistryRatings();

createResponse($response);