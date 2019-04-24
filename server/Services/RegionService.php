<?php
require_once "../Models/Region.php";
require_once "../core.php";

class RegionService
{
    private $regions;

    function __construct()
    {
        $this->regions = array(
            new Region(1, 'Автономна республіка Крим'),
            new Region(2, 'Вінницька область'),
            new Region(3, 'Волинська область'),
            new Region(4, 'Дніпропетровська область'),
            new Region(5, 'Донецька область'),
            new Region(6, 'Житомирська область'),
            new Region(7, 'Закарпатська область'),
            new Region(8, 'Запорізька область'), 
            new Region(9, 'Івано-Франківська область'),
            new Region(10, 'Київська область'),
            new Region(11, 'Кіровоградська область'),
            new Region(12, 'Луганська область'),
            new Region(13, 'Львівська область'),
            new Region(14, 'Миколаївська область'),
            new Region(15, 'Одеська область'),
            new Region(16, 'Полтавська область'),
            new Region(17, 'Рівненська область'),
            new Region(18, 'Сумська область'),
            new Region(19, 'Тернопільська область'),
            new Region(20, 'Харківська область'),
            new Region(21, 'Херсонська область'),
            new Region(22, 'Хмельницька область'),
            new Region(23, 'Черкаська область'),
            new Region(24, 'Чернівецька область'),
            new Region(25, 'Чернігівська область'),
            new Region(26, 'м. Київ'),
            new Region(27, 'м. Севастополь')
        );
    }

    function getAll()
    {
        $response = new ResponseModel();

        $response->setResponseModel((object)["data" => $this->regions, "status" => TRUE, "message" => NULL]);

        return $response;
    }
}
?>