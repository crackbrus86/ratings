<?php
require_once "../Models/Record.php";

class RecordService
{
    private $records;

    public function __construct()
    {
        $this->records = array(
            new Record(1, "Рекорд світу", 1, "OpenWorldRecord", TRUE, "РС"),
            new Record(2, "Рекорд Європи", 2, "OpenEuropeRecord", TRUE, "РЄ"),
            new Record(3, "Рекорд світу (юніори)", 3, "JuniorWorldRecord", TRUE, "РСю"),
            new Record(4, "Рекорд Європи (юніори)", 4, "JuniorEuropeRecord", TRUE, "РЄю"),
            new Record(5, "Рекорд світу (юнаки)", 5, "SubJuniorWorldRecord", TRUE, "РСюн"),
            new Record(6, "Рекорд Європи (юнаки)", 6, "SubJuniorEuropeRecord", TRUE, "РЄюн")
        );
    }

    public function getAll()
    {
        $response = new ResponseModel();
        $response->setResponseModel((object)array("data" => $this->records, "status" => TRUE, "message" => NULL));
        return $response;
    }
}