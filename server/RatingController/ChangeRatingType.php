<?php
require_once "../Services/RatingTypeService.php";
require_once "../core.php";

$services = new RatingTypeService();

$response = $services->changeStatus();

createResponse($response);