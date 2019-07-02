<?php
require_once "../Services/RefereeSettingService.php";
require_once "../core.php";

$service = new RefereeSettingService();

$response = $service->delete();

createResponse($response);