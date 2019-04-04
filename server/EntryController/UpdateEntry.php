<?php
require_once "../core.php";
require_once "../Services/EntryService.php";

$service = new EntryService();

$response = $service->updateEntry();

createResponse($response);