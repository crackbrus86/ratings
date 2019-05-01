<?php
require_once "../connect.php";
require_once "../core.php";

class FstService
{
    private $db;

    private $tableName;

    private $fstList;

    function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->tableName = $this->db->get_blog_prefix() . "rat_entry";

        $this->fstList = array();
    }

    public function getAllFst()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object) ["status" => FALSE, "message" => "У вас недостатньо прав для отримання даних!"]);

            return $response;
        }

        $results = $this->db->get_results("SELECT DISTINCT Fst FROM {$this->tableName} WHERE Fst IS NOT NULL AND Fst != ''");

        if(count($results))
        {
            foreach ($results as $result) {
                array_push($this->fstList, $result->Fst);
            }
        }

        $response->setResponseModel((object)["status" => TRUE, "data" => $this->fstList, "message" => NULL]);

        return $response;
    }
}
?>