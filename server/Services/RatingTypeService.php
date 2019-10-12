<?php
require_once "../Models/RatingType.php";
require_once "../core.php";

class RatingTypeService
{
    private $ratingTypes;

    public function __construct()
    {
        $this->ratingTypes = array(
            new RatingType(1, "minAthMale", "Міністерський Рейтинг (Чоловіки)", "ministry", "athlete"),
            new RatingType(2, "minAthFemale", "Міністерський Рейтинг (Жінки)", "ministry", "athlete"),
            new RatingType(3, "upfAthMale", "Рейтинг ФПУ (Чоловіки)", "upf", "athlete"),
            new RatingType(4, "upfAthFemale", "Рейтинг ФПУ (Жінки)", "upf", "athlete"),
            new RatingType(5, "minCoach", "Міністерський Рейтинг (Тренери)", "ministry", "coach"),
            new RatingType(6, "upfCoach", "Рейтинг ФПУ (Тренери)", "upf", "coach"),
            new RatingType(7, "minRegion", "Міністерський Рейтинг (Області)", "ministry", "region"),
            new RatingType(8, "minFST", "Міністерський Рейтинг (ФСТ)", "ministry", "fst"),
            new RatingType(9, "minSchool", "Міністерський Рейтинг (ДЮСШ)", "ministry", "school")
        );
    }

    public function getAll()
    {
        $response = new ResponseModel();

        $response->setResponseModel((object)array("data" => $this->ratingTypes, "status" => TRUE, "message" => NULL));

        return $response;
    }
}
?>