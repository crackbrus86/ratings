<?php
require_once "../connect.php";
require_once "../core.php";

class SchoolService
{
    private $db;

    private $tableName;

    private $schools;

    function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->tableName = $this->db->get_blog_prefix() . "rat_entry";

        $this->schools = array();
    }

    public function getAllSchools()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)["status" => FALSE, "message" => "У вас недостатньо прав для отримання даних!"]);

            return $response;
        }

        $results = $this->db->get_results("SELECT DISTINCT School FROM {$this->tableName} WHERE School IS NOT NULL AND School != ''");

        if(count($results))
        {
            foreach ($results as $result) {
                array_push($this->schools, $result->School);
            }
        }

        $response->setResponseModel((object)["status" => TRUE, "data" => $this->schools, "message" => NULL]);

        return $response;
    }
}
?>