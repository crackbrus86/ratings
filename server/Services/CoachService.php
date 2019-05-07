<?php
require_once "../connect.php";
require_once "../core.php";

class CoachService
{
    private $db;

    private $tableName;

    private $coaches;

    function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->tableName = $this->db->get_blog_prefix() . "rat_entry";

        $this->coaches = array();
    }

    public function getCoachesLookup()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "У вас недостатньо прав для отримання даних!"));

            return  $response;
        }

        $results = $this->db->get_results("SELECT DISTINCT Coach FROM $this->tableName WHERE Coach IS NOT NULL AND Coach != ''");

        if(count($results))
        {
            foreach ($results as $result) {
                array_push($this->coaches, $result->Coach);
            }
        }

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->coaches, "message" => NULL));

        return $response;
    }
}
?>