<?php
require_once "../Models/Record.php";

class RecordService
{
    private $records;

    public function __construct()
    {
        $this->records = array(
            new Record(1, "Рекорд світу", 1, "OpenWorldRecord"),
            new Record(2, "Рекорд Європи", 2, "OpenEuropeRecord"),
            new Record(3, "Рекорд світу (юніори)", 3, "JuniorWorldRecord"),
            new Record(4, "Рекорд Європи (юніори)", 4, "JuniorEuropeRecord"),
            new Record(5, "Рекорд світу (юнаки)", 5, "SubJuniorWorldRecord"),
            new Record(6, "Рекорд Європи (юнаки)", 6, "SubJuniorEuropeRecord")
        );
    }

    public function getAll()
    {
        $response = new ResponseModel();
        $response->setResponseModel((object)["data" => $this->records, "status" => TRUE, "message" => NULL]);
        return $response;
    }
}