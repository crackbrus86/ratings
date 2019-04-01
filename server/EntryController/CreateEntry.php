<?php
require_once "../Services/EntryService.php";
require_once "../core.php";

$service = new EntryService();
$response = $service->createEntry();
if(!$response)
    createResponse(null, TRUE, "Успішно створено запис!");
else
    createResponse(null, FALSE, $response);