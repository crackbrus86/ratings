<?php
require_once "../Models/Competition.php";
require_once "../core.php";

class CompetitionService
{
    private $competitions;

    public function __construct()
    {
        $this->competitions = array(
            new Copmetition(1, "Всесвітні ігри", 1, "WorldGames"),
            new Copmetition(2, "Чемпіонат світу", 2, "OpenWorldChampionship"),
            new Copmetition(3, "Чемпіонат Європи", 3, "OpenEuropeanChampionship"),
            new Copmetition(4, "Чемпіонат України", 4, "OpenUkraineChampionship"),
            new Copmetition(5, "Чемпіонат світу серед молоді та юніорів", 5, "JuniorWorldChampionship"),
            new Copmetition(6, "Чемпіонат Європи серед молоді та юніорів", 6, "JuniorEuropeanChampionship"),
            new Copmetition(7, "Чемпіонат України серед молоді та юніорів", 7, "JuniorUkraineChampionship"),
            new Copmetition(8, "Чемпіонат світу серед юнаків", 8, "SubJuniorWorldChampionship"),
            new Copmetition(9, "Чемпіонат Європи серед юнаків", 9, "SubJuniorEuropeanChampionship"),
            new Copmetition(10, "Чемпіонат України серед юнаків", 10, "SubJuniorUkraineChampionship"),
            new Copmetition(11, "Кубок світу", 11, "WorldCup"),
            new Copmetition(12, "Кубок Європи", 12, "EuropeanCup"),
            new Copmetition(13, "Кубок України", 13, "UkraineCup")
        );
    }

    function getAll()
    {
        $response = new ResponseModel();
        $response->setResponseModel((object)["data" => $this->competitions, "status" => TRUE, "message" => NULL]);
        return $response;
    }
}