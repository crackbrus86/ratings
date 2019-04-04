<?php
require_once "../Services/EntryService.php";
require_once "../core.php";

$service = new EntryService();

$response = $service->getEntries();

createResponse($response);
