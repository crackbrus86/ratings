<?php
require_once "../Models/Competition.php";
require_once "../core.php";

class CompetitionService
{
    private $competitions;

    public function __construct()
    {
        $this->competitions = array(
            new Copmetition(1, "Всесвітні ігри", 1, "WorldGames", TRUE, "ВІ"),
            new Copmetition(2, "Чемпіонат світу", 2, "OpenWorldChampionship", TRUE, "ЧС"),
            new Copmetition(3, "Чемпіонат Європи", 3, "OpenEuropeanChampionship", TRUE, "ЧЄ"),
            new Copmetition(4, "Чемпіонат України", 4, "OpenUkraineChampionship", FALSE, "ЧУ"),
            new Copmetition(5, "Чемпіонат світу серед юніорів", 5, "JuniorWorldChampionship", TRUE, "ЧСю"),
            new Copmetition(6, "Чемпіонат Європи серед юніорів", 6, "JuniorEuropeanChampionship", TRUE, "ЧЄю"),
            new Copmetition(7, "Чемпіонат України серед юніорів", 7, "JuniorUkraineChampionship", FALSE, "ЧУю"),
            new Copmetition(8, "Чемпіонат світу серед юнаків", 8, "SubJuniorWorldChampionship", TRUE, "ЧСюн"),
            new Copmetition(9, "Чемпіонат Європи серед юнаків", 9, "SubJuniorEuropeanChampionship", TRUE, "ЧЄюн"),
            new Copmetition(10, "Чемпіонат України серед юнаків", 10, "SubJuniorUkraineChampionship", FALSE, "ЧУюн"),
            new Copmetition(11, "Кубок світу", 11, "WorldCup", FALSE, "КС"),
            new Copmetition(12, "Кубок Європи", 12, "EuropeanCup", TRUE, "КЄ"),
            new Copmetition(13, "Кубок України", 13, "UkraineCup", FALSE, "КУ"),
            new Copmetition(14, "Кубок Дунаю", 14, "DonauCup", TRUE, "КД")
        );
    }

    function getAll()
    {
        $response = new ResponseModel();
        $response->setResponseModel((object)array("data" => $this->competitions, "status" => TRUE, "message" => NULL));
        return $response;
    }
}