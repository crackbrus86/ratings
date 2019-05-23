<?php
require_once "../Models/CompetitionType.php";
require_once "../core.php";

class CompetitionTypeService
{
    private $compTypes;

    public function __construct()
    {
        
        $this->compTypes = array(
            new CompetitionType("PL", "Пауерліфтинг"),

            new CompetitionType("CPL", "Класичний Пауерліфтинг"),

            new CompetitionType("BP", "Жим"),

            new CompetitionType("CBP", "Класичний Жим"),

            new CompetitionType("SQS", "Присідання (окрема вправа)"),

            new CompetitionType("BS", "Жим (окрема вправа)"),

            new CompetitionType("DLS", "Тяга (окрема вправа)")
        );

    }

    function getAll()
    {
        $response = new ResponseModel();

        $response->setResponseModel((object) array("data" => $this->compTypes, "status" => TRUE, "message" => NULL));

        return $response;
    }
}