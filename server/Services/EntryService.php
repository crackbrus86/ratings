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

        $this->entries = array();
    }

    public function createEntry()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => "У Вас недостатньо прав для створення записів!"]);

            return $response;
        } 

        $entry = $this->mapEntry();

        $validationResult = $entry->validate();

        if(!$validationResult->isValid) 
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => $validationResult->message]);

            return $response;
        }else{
            $sql = $this->db->prepare("INSERT INTO {$this->tableName} (Fullname, Type, Event, Place, EventDate, Gender) 
                VALUES (%s, %s, %s, %d, %s, %s)", $entry->fullname, $entry->type, $entry->event, $entry->place, $entry->eventDate, $entry->gender);

            $this->db->query($sql);
        }

        $response->setResponseModel((object)['status' => TRUE, 'message' => "Успішно створено запис!"]);

        return $response;
    }

    public function updateEntry()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => "У Вас недостатньо прав для редагуваня записів!"]);

            return $response;
        } 

        $entry = $this->mapEntry();

        $validationResult = $entry->validate();

        if(!$validationResult->isValid) 
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => $validationResult->message]);

            return $response;
        }else{
            $sql = $this->db->prepare("UPDATE {$this->tableName} SET Fullname = %s, Type = %s, Event = %s, Place = %d, EventDate = %s, Gender = %s 
                WHERE RatingEntryId = %d", $entry->fullname, $entry->type, $entry->event, $entry->place, $entry->eventDate, $entry->gender, $entry->ratingEntryId);

            $this->db->query($sql);
        }

        $response->setResponseModel((object)['status' => TRUE, 'message' => "Успішно оновлено запис!"]);

        return $response;
    }

    public function getEntries()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages")) 
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => "У Вас недостатньо прав для отримання записів!"]);

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

        $response->setResponseModel((object)["status" => TRUE, "data" => $this->entries, "message" => NULL]);

        return $response;
    }

    public function deleteEntry()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages")) 
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => "У Вас недостатньо прав для видалення записів!"]);

            return $response;
        }

        $targetEntry = (object)["ratingEntryId" => NULL];

        $targetEntry = mapPostToObject($targetEntry);

        if(!$targetEntry->ratingEntryId)
        {
            $response->setResponseModel((object)['status' => FALSE, 'message' => "Rating Entry Id is required!"]);

            return $response;
        }

        $sql = $this->db->prepare("DELETE FROM {$this->tableName} WHERE RatingEntryId = %d", $targetEntry->ratingEntryId);

        $this->db->query($sql);

        $response->setResponseModel((object)["status" => TRUE, "message" => "Запис було успішно видалено!"]);

        return $response;
    }

    private function mapEntry()
    {
        $entry = new Entry();

        $entry = mapPostToObject($entry);

        $entry->ratingEntryId = intval($entry->ratingEntryId);

        $entry->place = intval($entry->place);

        $entry->eventDate = convertToDate($entry->eventDate);

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