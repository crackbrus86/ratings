<?php
require_once "../connect.php";
require_once "../core.php";

class RefereeNameService
{
    private $db;
    private $tableName;
    private $names;

    public function __construct()
    {
        global $wpdb;
        $this->db = $wpdb;
        $this->tableName = $this->db->get_blog_prefix() . "rat_referee_entry";
        $this->names = array();
    }

    public function getAll()
    {
        $response = new ResponseModel();
        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "У вас недостатньо прав для отримання даних!" ));
            return $response;
        }

        $results = $this->db->get_results("SELECT DISTINCT Fullname FROM $this->tableName");
        if(count($results) > 0)
        {
            $this->names = array_map(array($this, "getFullName"), $results);
        }

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->names, "message" => NULL));
        return $response;
    }

    private function getFullName($record)
    {
        return $record->Fullname;
    }
}