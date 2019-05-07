<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/Point.php";
require_once "../Models/Competition.php";
require_once "CompetitionService.php";

class PointService
{
    private $db;
    private $points;
    private $pointTableName;

    public function __construct()
    {
        global $wpdb;
        $this->db = $wpdb;
        $this->pointTableName = $this->db->get_blog_prefix() . "rat_point";
        $this->points = array();
    }

    public function getAll()
    {
        $response = new ResponseModel();
        $result = $this->db->get_results("SELECT * FROM $this->pointTableName");
        if(count($result))
        {
            foreach ($result as $point) {
                array_push($this->points, new Point($point->PointId, $point->Target, $point->Value, $point->Place));
            }
        }
        $response->setResponseModel((object)array("data" => $this->points, "status" => TRUE, "message" => NULL));
        return $response;
    }

    public function savePoint()
    {
        $response = new ResponseModel();
        if(!current_user_can("edit_others_pages")) {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для збереження даних!"));
            return $response;
        }
        $point = new Point(intval(escape($_POST["pointId"])), escape($_POST["target"]), escape($_POST["value"]), escape($_POST["place"]));
        $sql = $this->db->prepare("SELECT COUNT(*) FROM $this->pointTableName WHERE PointId = %d OR (Target = %s AND Place = %d)", 
                                    $point->pointId, $point->target, $point->place);
        $exists = $this->db->get_var($sql);
        if(!$exists)
        {
            $sql = $this->db->prepare("INSERT INTO $this->pointTableName (Target, Value, Place) 
            VALUES (%s, %d, %d)", $point->target, $point->value, $point->place);
            $this->db->query($sql);
        }else{
            $sql = $this->db->prepare("UPDATE $this->pointTableName SET Value = %d WHERE PointId = %d", $point->value, $point->pointId);
            $this->db->query($sql);
        }
        $response->setResponseModel((object)array('status' => TRUE, 'message' => "Значення збережено!"));
        return $response;
    }

}