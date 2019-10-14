<?php
require_once "../connect.php";
require_once "../Models/RatingType.php";
require_once "../core.php";

class RatingTypeService
{
    private $db;
    private $tableName;
    private $ratingTypes;

    public function __construct()
    {
        global $wpdb;
        $this->db = $wpdb;
        $this->tableName = $this->db->get_blog_prefix() . "rat_rating_type";
        $this->ratingTypes = array();
    }

    public function getAll()
    {
        $response = new ResponseModel();

        $sql = "SELECT * FROM {$this->tableName}";
        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $item) 
            {
                $ratingType = new RatingType($item->Id, $item->RatingType, $item->Title, $item->Organization, $item->Type);

                array_push($this->ratingTypes, $ratingType);
            }
        }

        $response->setResponseModel((object)array("data" => $this->ratingTypes, "status" => TRUE, "message" => NULL));

        return $response;
    }

    public function changeStatus()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для оновлення записів!"));
            return $response;
        }

        $ratingType = $_POST["ratingType"];
        $sql = $this->db->prepare("UPDATE {$this->tableName}
                                    SET IsActive = CASE WHEN IsActive = 0 THEN 1 ELSE 0 END
                                    WHERE RatingType = %s", $ratingType);
        $this->db->query($sql);
        $response->setResponseModel((object)array('status' => TRUE, 'message' => "Успішно оновлено рейтинг!"));
        return $response;
    }
}
?>