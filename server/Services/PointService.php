<?php
require_once "../connect.php";
require_once "../Models/Point.php";
require_once "../Models/Competition.php";
require_once "CompetitionService.php";

class PointService
{
    private $db;
    private $points;
    private $pointTableName;
    private $competitions;
    private $competitionService;

    public function __construct()
    {
        global $wpdb;
        $this->db = $wpdb;
        $this->pointTableName = $this->db->get_blog_prefix() . "rat_point";
        $this->competitionService = new CompetitionService();
        $this->competitions = $this->competitionService->getAll();
        $this->points = array();
    }

    public function getAll()
    {
        $result = $this->db->get_results("SELECT * FROM $this->pointTableName");
        if(count($result))
        {
            foreach ($$result as $point) {
                array_push($this->points, new Point($point->PointId, $point->Target, $point->Value, $point->Place));
            }
        }
        else
        {
            $counter = 1;
            foreach ($this->competitions as $competition) {
                for($place = 1; $place <= 3; $place++)
                    array_push($this->points, new Point($counter, $competition->dbName, 0, $place));
                $counter++;
            }
        }
        return $this->points;
    }

}