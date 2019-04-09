<?php
require_once "../connect.php";
require_once "../core.php";

class NameService
{
    private $db;

    private $tableName;

    private $names;

    function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->tableName = $this->db->get_blog_prefix() . "rat_entry";

        $this->names = array();
    }

    public function getAllNames()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)["status" => FALSE, "message" => "У вас недостатньо прав для отримання даних!"]);

            return $response;
        }

        $results = $this->db->get_results("SELECT DISTINCT Fullname FROM $this->tableName");

        if(count($results))
        {
            foreach ($results as $result) {
                array_push($this->names, $result->Fullname);
            }
        }
        
        $response->setResponseModel((object)["status" => TRUE, "data" => $this->names, "message" => NULL]);

        return $response;
    }
}

