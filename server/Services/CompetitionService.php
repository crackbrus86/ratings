<?php
require_once "../Models/Competition.php";
require_once "../core.php";

class CompetitionService
{
    private $competitions;

    public function __construct()
    {
        $this->competitions = array(
            new Copmetition(1, "Всесвітні ігри", 1, "WorldGames", TRUE),
            new Copmetition(2, "Чемпіонат світу", 2, "OpenWorldChampionship", TRUE),
            new Copmetition(3, "Чемпіонат Європи", 3, "OpenEuropeanChampionship", TRUE),
            new Copmetition(4, "Чемпіонат України", 4, "OpenUkraineChampionship", FALSE),
            new Copmetition(5, "Чемпіонат світу серед молоді та юніорів", 5, "JuniorWorldChampionship", TRUE),
            new Copmetition(6, "Чемпіонат Європи серед молоді та юніорів", 6, "JuniorEuropeanChampionship", TRUE),
            new Copmetition(7, "Чемпіонат України серед молоді та юніорів", 7, "JuniorUkraineChampionship", FALSE),
            new Copmetition(8, "Чемпіонат світу серед юнаків", 8, "SubJuniorWorldChampionship", TRUE),
            new Copmetition(9, "Чемпіонат Європи серед юнаків", 9, "SubJuniorEuropeanChampionship", TRUE),
            new Copmetition(10, "Чемпіонат України серед юнаків", 10, "SubJuniorUkraineChampionship", FALSE),
            new Copmetition(11, "Кубок світу", 11, "WorldCup", FALSE),
            new Copmetition(12, "Кубок Європи", 12, "EuropeanCup", TRUE),
            new Copmetition(13, "Кубок України", 13, "UkraineCup", FALSE)
        );
    }

    function getAll()
    {
        $response = new ResponseModel();
        $response->setResponseModel((object)["data" => $this->competitions, "status" => TRUE, "message" => NULL]);
        return $response;
    }
}