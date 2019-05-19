<?php
require_once "../Models/RatingType.php";
require_once "../core.php";

class RatingTypeService
{
    private $ratingTypes;

    public function __construct()
    {
        $this->ratingTypes = array(
            new RatingType(1, "minAthMale", "Міністерський Рейтинг (Чоловіки)", "ministry"),
            new RatingType(2, "minAthFemale", "Міністерський Рейтинг (Жінки)", "ministry"),
            new RatingType(3, "upfAthMale", "Рейтинг ФПУ (Чоловіки)", "upf"),
            new RatingType(4, "upfAthFemale", "Рейтинг ФПУ (Жінки)", "upf"),
            new RatingType(5, "minCoach", "Міністерський Рейтинг (Тренери)", "ministry"),
            new RatingType(6, "upfCoach", "Рейтинг ФПУ (Тренери)", "upf"),
            new RatingType(7, "minRegion", "Міністерський Рейтинг (Області)", "ministry"),
            new RatingType(8, "minFST", "Міністерський Рейтинг (ФСТ)", "ministry"),
            new RatingType(9, "minSchool", "Міністерський Рейтинг (ДЮСШ)", "ministry")
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