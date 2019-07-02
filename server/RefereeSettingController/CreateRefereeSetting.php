<?php
require_once "../Services/RefereeSettingService.php";
require_once "../core.php";

$service = new RefereeSettingService();

$response = $service->create();

createResponse($response);