<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/Entry.php";

class EntryService
{
    private $db;

    private $tableName;

    private $entries;

    public function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->tableName = $this->db->get_blog_prefix() . "rat_entry";

        $this->pointTableName = $this->db->get_blog_prefix() . "rat_point";

        $this->rangeTableName = $this->db->get_blog_prefix() . "rat_range";

        $this->entries = array();
    }

    public function createEntry()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для створення записів!"));

            return $response;
        } 

        $entry = $this->mapEntry();

        $validationResult = $entry->validate();

        if(!$validationResult->isValid) 
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => $validationResult->message));

            return $response;
        }else{
            $sql = $this->db->prepare("SELECT Value FROM {$this->pointTableName} WHERE Target = %s AND Place = %d", $entry->event, $entry->place);
            $point = $this->db->get_row($sql);

            $sql = $this->db->prepare("SELECT `Range` FROM {$this->rangeTableName} WHERE Competition = %s AND Place = %d AND CompType = %s", 
            $entry->event, $entry->place, $entry->compType);
            $range = $this->db->get_row($sql);

            $sql = $this->db->prepare("INSERT INTO {$this->tableName} (Fullname, Type, Event, Place, EventDate, Gender, Division, CompType, Wilks, Region,
                Coach, Fst, School, PointValue, RangeValue) 
                VALUES (%s, %s, %s, %d, %s, %s, %s, %s, %s, %s, %s, %s, %s, %d, %d)", 
                $entry->fullname, $entry->type, $entry->event, $entry->place, $entry->eventDate, $entry->gender, $entry->division, $entry->compType, 
                (float)$entry->wilks, $entry->region, $entry->coach, $entry->fst, $entry->school, $point->Value, $range->Range);

            $this->db->query($sql);
        }

        $response->setResponseModel((object)array('status' => TRUE, 'message' => "Успішно створено запис!"));

        return $response;
    }

    public function updateEntry()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для редагуваня записів!"));

            return $response;
        } 

        $entry = $this->mapEntry();

        $validationResult = $entry->validate();

        if(!$validationResult->isValid) 
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => $validationResult->message));

            return $response;
        }else{
            $sql = $this->db->prepare("SELECT Value FROM {$this->pointTableName} WHERE Target = %s AND Place = %d", $entry->event, $entry->place);
            $point = $this->db->get_row($sql);

            $sql = $this->db->prepare("SELECT `Range` FROM {$this->rangeTableName} WHERE Competition = %s AND Place = %d AND CompType = %s", 
                        $entry->event, $entry->place, $entry->compType);
            $range = $this->db->get_row($sql);

            $sql = $this->db->prepare("UPDATE {$this->tableName} 
                                        SET Fullname = %s, Type = %s, Event = %s, Place = %d, EventDate = %s, Gender = %s, Division = %s, CompType = %s, 
                                        Wilks = %s, Region = %s, Coach = %s, Fst = %s, School = %s, PointValue = %d, RangeValue = %d
                                        WHERE RatingEntryId = %d", 
                                        $entry->fullname, $entry->type, $entry->event, $entry->place, $entry->eventDate, 
                                        $entry->gender, $entry->division, $entry->compType, $entry->wilks, $entry->region,
                                        $entry->coach, $entry->fst, $entry->school, $point->Value, $range->Range, $entry->ratingEntryId);

            $this->db->query($sql);
        }

        $response->setResponseModel((object)array('status' => TRUE, 'message' => "Успішно оновлено запис!"));

        return $response;
    }

    public function getEntries()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages")) 
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для отримання записів!"));

            return $response;
        }

        $year = $_GET["year"];

        $sql = $this->db->prepare("SELECT * FROM {$this->tableName} WHERE YEAR(EventDate) = %s", $year);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $item) 
            {
                $entry = $this->mapEntryMySQLResult($item);

                array_push($this->entries, $entry);
            }
        }

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->entries, "message" => NULL));

        return $response;
    }

    public function deleteEntry()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages")) 
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для видалення записів!"));

            return $response;
        }

        $targetEntry = (object)array("ratingEntryId" => NULL);

        $targetEntry = mapPostToObject($targetEntry);

        if(!$targetEntry->ratingEntryId)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Rating Entry Id is required!"));

            return $response;
        }

        $sql = $this->db->prepare("DELETE FROM {$this->tableName} WHERE RatingEntryId = %d", $targetEntry->ratingEntryId);

        $this->db->query($sql);

        $response->setResponseModel((object)array("status" => TRUE, "message" => "Запис було успішно видалено!"));

        return $response;
    }

    private function mapEntry()
    {
        $entry = new Entry();

        $entry = mapPostToObject($entry);

        $entry->ratingEntryId = intval($entry->ratingEntryId);

        $entry->place = intval($entry->place);

        $entry->eventDate = convertToDate($entry->eventDate);

        $entry->wilks = floatval($entry->wilks);

        return $entry;
    }

    private function mapEntryMySQLResult($result)
    {
        $entry = new Entry();

        $entry = mapMySQLResultToObject($result, $entry);

        $entry->eventDate = reverseDate($entry->eventDate);

        return $entry;
    }
}