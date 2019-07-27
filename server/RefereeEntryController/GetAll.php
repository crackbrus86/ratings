<?php
require_once "../Services/RefereeEntryService.php";
require_once "../core.php";

$service = new RefereeEntryService();

$response = $service->getAll();

createResponse($response);