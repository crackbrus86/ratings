<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/Rating.php";

class RefereeRatingService
{
    private $db;
    private $entryTable;
    private $settingTable;
    private $ratings;

    public function __construct()
    {
        global $wpdb;
        $this->db = $wpdb;
        $this->entryTable = $this->db->get_blog_prefix() . "rat_referee_entry";
        $this->settingTable = $this->db->get_blog_prefix() . "rat_referee_setting";
        $this->ratings = array();
    }

    public function getAll()
    {
        $year = $_GET["year"];
        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT a.Fullname, SUM(b.Coefficient) AS Rating,
                                        GROUP_CONCAT(CONCAT(' ',a.Event, ' ', b.Activity, ' - ', b.Coefficient, ' балів') separator ', ') AS Details
                                    FROM $this->entryTable a
                                    JOIN $this->settingTable b ON b.Id = a.Activity
                                    WHERE YEAR(a.EventDate) = %s
                                    GROUP BY a.Fullname
                                    ORDER BY Rating DESC", $year);
        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Fullname, $result->Rating, NULL, $result->Details, array(), NULL));
            }
        }

        $response = new ResponseModel();
        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));
        return $response;
    }
}