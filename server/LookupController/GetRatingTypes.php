<?php
require_once "../Services/RatingTypeService.php";
require_once "../core.php";

$service = new RatingTypeService();

$response = $service->getAll();

createResponse($response);