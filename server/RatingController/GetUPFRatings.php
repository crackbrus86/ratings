<?php
require_once "../Services/RatingService.php";
require_once "../core.php";

$service = new RatingService();

$response = $service->getUPFRating();

createResponse($response);