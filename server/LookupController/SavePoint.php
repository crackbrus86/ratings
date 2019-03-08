<?php
require_once "../Services/PointService.php";
require_once "../core.php";

$service = new PointService();
$isSaved = $service->savePoint();
if($isSaved) 
    createResponse(null, true, "Збережено вдало");
else
    createResponse(null, false, "У Вас недостатньо прав для внесення змін!");