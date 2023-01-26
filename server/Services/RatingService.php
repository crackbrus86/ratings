<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/Rating.php";

class RatingService
{
    private $db;

    private $entryTable;

    private $pointTable;

    private $rangeTale;

    private $ratingTypeTable;

    private $ratings;

    function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->entryTable = $this->db->get_blog_prefix() . "rat_entry";

        $this->pointTable = $this->db->get_blog_prefix() . "rat_point";

        $this->rangeTale = $this->db->get_blog_prefix() . "rat_range";

        $this->ratingTypeTable = $this->db->get_blog_prefix() . "rat_rating_type";

        $this->ratings = array();
    }

    public function getMinistryRatings()
    {
        $year = $_GET["year"];
        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT Fullname, SUM(PointValue) AS Rating, Gender,
                                        GROUP_CONCAT(CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', PointValue, ' балів)') separator ', ') AS Details,
                                        MAX(Wilks) AS Wilks
                                        FROM $this->entryTable
                                        WHERE YEAR(EventDate) = %s AND PointValue IS NOT NULL
                                    GROUP BY Fullname, Gender
                                    ORDER BY Rating DESC, Wilks DESC", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Fullname, $result->Rating, $result->Gender, $result->Details, array(), $result->Wilks));
            }
        }

        $response = new ResponseModel();

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response;
    }

    public function getMinistryRatingsByGender()
    {
        $year = $_GET["year"];
        $gender = $_GET["gender"];
        $rType = $gender == "M" ? "minAthMale" : "minAthFemale";

        $response = new ResponseModel();

        $isActive = (bool)$this->getRatingActivity($rType);

        if(!current_user_can("edit_others_pages") && !$isActive)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Рейтинг недоступний!"));

            return $response;
        } 

        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT Fullname, SUM(PointValue) AS Rating, Gender,
                                        GROUP_CONCAT(CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', PointValue, ' балів)') separator ', ') AS Details,
                                        MAX(Wilks) AS Wilks
                                        FROM $this->entryTable
                                        WHERE YEAR(EventDate) = %s AND Gender = %s AND PointValue IS NOT NULL
                                    GROUP BY Fullname, Gender
                                    ORDER BY Rating DESC, Wilks DESC", $year, $gender);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Fullname, $result->Rating, $result->Gender, $result->Details, array(), $result->Wilks));
            }
        }

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response;
    }

    public function getUPFRating()
    {
        $year = $_GET["year"];
        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT Fullname, Gender, MIN(RangeValue) AS Rating,
                                        GROUP_CONCAT(CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', RangeValue, ' ранг)') separator ', ') AS Details,
                                        COUNT(Event) AS EventCount,
                                        GROUP_CONCAT(CONCAT(' ', RangeValue) separator ', ') AS AllRanks,
                                        MAX(Wilks) AS Wilks
                                        FROM $this->entryTable
                                    WHERE YEAR(EventDate) = %s AND RangeValue <> 0
                                    GROUP BY Fullname, Gender
                                    ORDER BY Rating ASC, EventCount DESC, Wilks DESC", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Fullname, 
                                                      $result->Rating, 
                                                      $result->Gender, 
                                                      $result->Details, 
                                                      explode(",", $result->AllRanks), 
                                                      $result->Wilks));
            }
        }

        $response = new ResponseModel();

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response;
    }

    public function getUPFRatingsByGender()
    {
        $year = $_GET["year"];
        $gender = $_GET["gender"];
        $rType = $gender == "M" ? "upfAthMale" : "upfAthFemale";
        $response = new ResponseModel();
        $isActive = (bool)$this->getRatingActivity($rType);

        if(!current_user_can("edit_others_pages") && !$isActive)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Рейтинг недоступний!"));

            return $response;
        }
        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT Fullname, Gender, MIN(RangeValue) AS Rating,
                                        GROUP_CONCAT(CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', RangeValue, ' ранг)') separator ', ') AS Details,
                                        COUNT(Event) AS EventCount,
                                        GROUP_CONCAT(CONCAT(' ', RangeValue) separator ', ') AS AllRanks,
                                        MAX(Wilks) AS Wilks
                                        FROM $this->entryTable
                                    WHERE YEAR(EventDate) = %s AND Gender = %s AND RangeValue <> 0
                                    GROUP BY Fullname, Gender
                                    ORDER BY Rating ASC, EventCount DESC, Wilks DESC", $year, $gender);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Fullname, 
                                                      $result->Rating, 
                                                      $result->Gender, 
                                                      $result->Details, 
                                                      explode(",", $result->AllRanks), 
                                                      $result->Wilks));
            }
        }
        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response;
    }

    public function getCoachMinistryRatings()
    {
        $year = $_GET["year"];
        $response = new ResponseModel();
        $isActive = (bool)$this->getRatingActivity("minCoach");

        if(!current_user_can("edit_others_pages") && !$isActive)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Рейтинг недоступний!"));

            return $response;
        }
        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT Coach, SUM(PointValue) AS Rating,
                                        GROUP_CONCAT(CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', PointValue, ' балів) ', Fullname) separator ', ') AS Details
                                        FROM $this->entryTable
                                        WHERE YEAR(EventDate) = %s AND Coach != '' AND Coach IS NOT NULL AND PointValue IS NOT NULL
                                    GROUP BY Coach
                                    ORDER BY Rating DESC", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Coach, $result->Rating, '', $result->Details));
            }
        }
        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response;
    }

    public function getCoachUPFRatings()
    {
        $year = $_GET["year"];
        $response = new ResponseModel();
        $isActive = (bool)$this->getRatingActivity("upfCoach");

        if(!current_user_can("edit_others_pages") && !$isActive)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Рейтинг недоступний!"));

            return $response;
        }
        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT Coach, MIN(RangeValue) AS Rating,
                                        GROUP_CONCAT(CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', RangeValue, ' ранг) ', Fullname) separator ', ') AS Details,
                                        COUNT(Event) AS EventCount,
                                        GROUP_CONCAT(CONCAT(' ', RangeValue) separator ', ') AS AllRanks,
                                        MAX(Wilks) AS Wilks
                                        FROM $this->entryTable
                                    WHERE YEAR(EventDate) = %s AND Coach != '' AND Coach IS NOT NULL AND RangeValue <> 0
                                    GROUP BY Coach
                                    ORDER BY Rating ASC, EventCount DESC, Wilks DESC", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Coach, 
                                                      $result->Rating, 
                                                      '', 
                                                      $result->Details, 
                                                      explode(",", $result->AllRanks), 
                                                      $result->Wilks));
            }
        }
        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response;
    }

    public function getRegionMinistryRatings()
    {
        $year = $_GET["year"];
        $response = new ResponseModel();
        $isActive = (bool)$this->getRatingActivity("minRegion");

        if(!current_user_can("edit_others_pages") && !$isActive)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Рейтинг недоступний!"));

            return $response;
        }

        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT 
                                        IFNULL(a.Region, b.Region) AS Region, 
                                        SUM(PointValue) AS Rating,
                                        GROUP_CONCAT(DISTINCT CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', PointValue, ' балів) ', Fullname) separator ', ') AS Details
                                    FROM wp_rat_entry a
                                    LEFT JOIN wp_rat_entry_region_link b ON b.RatingEntryId = a.RatingEntryId
                                    WHERE YEAR(a.EventDate) = %s AND a.PointValue IS NOT NULL
                                    GROUP BY Region
                                    ORDER BY Rating DESC", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Region, $result->Rating, '', $result->Details));
            }
        }
        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response; 
    }

    public function getFstMinistryRatings()
    {
        $year = $_GET["year"];
        $response = new ResponseModel();
        $isActive = (bool)$this->getRatingActivity("minFST");

        if(!current_user_can("edit_others_pages") && !$isActive)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Рейтинг недоступний!"));

            return $response;
        }
        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT Fst, SUM(PointValue) AS Rating,
                                        GROUP_CONCAT(CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', PointValue, ' балів) ', Fullname) separator ', ') AS Details
                                        FROM $this->entryTable
                                        WHERE YEAR(EventDate) = %s AND Fst != '' AND Fst IS NOT NULL AND PointValue IS NOT NULL
                                    GROUP BY Fst
                                    ORDER BY Rating DESC", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->Fst, $result->Rating, '', $result->Details));
            }
        }
        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response; 
    }

    public function getSchoolMinistryRatings()
    {
        $year = $_GET["year"];
        $response = new ResponseModel();
        $isActive = (bool)$this->getRatingActivity("minSchool");

        if(!current_user_can("edit_others_pages") && !$isActive)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Рейтинг недоступний!"));

            return $response;
        }
        $this->db->query("SET SESSION group_concat_max_len = 100000");
        $sql = $this->db->prepare("SELECT School, SUM(PointValue) AS Rating,
                                        GROUP_CONCAT(CONCAT(' ', Event, ' ', CompType, ' (', Place, ' місце - ', PointValue, ' балів) ', Fullname) separator ', ') AS Details
                                        FROM $this->entryTable
                                        WHERE YEAR(EventDate) = %s AND School != '' AND Fst IS NOT NULL AND PointValue IS NOT NULL
                                    GROUP BY School
                                    ORDER BY Rating DESC", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $result) 
            {
                array_push($this->ratings, new Rating($result->School, $result->Rating, '', $result->Details));
            }
        }
        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->ratings));

        return $response; 
    }

    public function getRatingActivity($ratingType)
    {
        $sql = $this->db->prepare("SELECT IsActive FROM {$this->ratingTypeTable} WHERE RatingType = %s", $ratingType);
        $result = $this->db->get_var($sql);
        return $result == "1" ? TRUE : FALSE;
    }
}