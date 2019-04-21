<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/UPFRange.php";

class RangeService
{
    private $db;

    private $ranges;

    private $rangeTableName;

    public function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->rangeTableName = $this->db->get_blog_prefix() . "rat_range";

        $this->ranges = array();
    }

    public function getAll()
    {
        $response = new ResponseModel();

        $results = $this->db->get_results("SELECT * FROM $this->rangeTableName");

        if(count($results))
        {
            foreach ($results as $result) {
                array_push($this->ranges, $this->mapRangeMySQLResult($result));
            }
        }

        $response->setResponseModel((object)["data" => $this->ranges, "status" => TRUE, "message" => NULL]);

        return $response;
    }

    public function saveRange()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => "У Вас недостатньо прав для редагуваня записів!"]);

            return $response;
        } 

        $range = $this->mapRange();

        $validationResult = $range->validate();

        if(!$validationResult->isValid) 
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => $validationResult->message]);

            return $response;
        }else{

            $sql = $this->db->prepare("SELECT COUNT(*) FROM $this->rangeTableName WHERE Id = %d OR (Competition = %s AND Place = %d AND CompType = %s)", 
                                    $range->id, $range->competition, $range->place, $range->compType);
            $exists = $this->db->get_var($sql);

            if(!$exists)
            {

                $sql = $this->db->prepare("INSERT INTO $this->rangeTableName (Competition, Place, CompType, `Range`) 
                VALUES (%s, %d, %s, %d)", 
                $range->competition, $range->place, $range->compType, $range->range);

                $this->db->query($sql);
            }
            else
            {
                $sql = $this->db->prepare("UPDATE $this->rangeTableName SET `Range` = %d WHERE Id = %d", $range->range, $range->id);
                
                $this->db->query($sql);
            }
        }

        $response->setResponseModel((object)['status' => TRUE, 'message' => "Успішно збережено ранг!"]);

        return $response;
    }

    private function mapRange()
    {
        $range = new UPFRange();

        $range = mapPostToObject($range);

        $range->id = intval($range->id);

        $range->place = intval($range->place);

        $range->range = intval($range->range);

        return $range;
    }

    private function mapRangeMySQLResult($result)
    {
        $range = new UPFRange();

        $range = mapMySQLResultToObject($result, $range);

        return $range;
    }
}