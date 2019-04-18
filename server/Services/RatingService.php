<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/Rating.php";

class RatingService
{
    private $db;

    private $entryTable;

    private $pointTable;

    private $ratings;

    function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->entryTable = $this->db->get_blog_prefix() . "rat_entry";

        $this->pointTable = $this->db->get_blog_prefix() . "rat_point";

        $this->ratings = array();
    }

    public function getMinistryRatings()
    {
        $year = $_GET["year"];

        $sql = $this->db->prepare("SELECT a.Fullname, SUM(b.Value) AS Rating, a.Gender,
                                        GROUP_CONCAT(CONCAT(' ', a.Event, ' ', a.CompType, ' (', a.Place, ' місце - ', b.Value, ' балів)') separator ', ') AS Details
                                        FROM $this->entryTable a
                                        JOIN $this->pointTable b ON b.Target = a.Event AND b.Place = a.Place
                                        WHERE YEAR(a.EventDate) = %s
                                    GROUP BY a.Fullname, a.Gender
                                    ORDER BY Rating DESC", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Fullname, $result->Rating, $result->Gender, $result->Details));
            }
        }

        $response = new ResponseModel();

        $response->setResponseModel((object)["status" => TRUE, "data" => $this->ratings]);

        return $response;
    }
}