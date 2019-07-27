<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/RefereeEntry.php";

class RefereeEntryService
{
    private $db;
    private $tableName;
    private $refereeEntries;

    public function __construct()
    {
        global $wpdb;
        $this->db = $wpdb;
        $this->tableName = $this->db->get_blog_prefix() . "rat_referee_entry";
        $this->refereeEntries = array();
    }

    public function create()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для створення записів!"));
            return $response;
        } 

        $refereeEntry = $this->mapRefereeEntry();

        $validationResult = $refereeEntry->validate();

        if(!$validationResult->isValid)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => $validationResult->message));
            return $response;
        }else{
            $sql = $this->db->prepare("INSERT INTO {$this->tableName} (Fullname, Event, Activity, EventDate)
                    VALUES (%s, %s, %d, %s)", $refereeEntry->fullname, $refereeEntry->event, $refereeEntry->activity, $refereeEntry->eventDate);
            $this->db->query($sql);
        }
        $response->setResponseModel((object)array('status' => TRUE, 'message' => "Успішно створено запис!"));
        return $response;
    }

    public function update()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для оновлення записів!"));
            return $response;
        }

        $refereeEntry = $this->mapRefereeEntry();

        $validationResult = $refereeEntry->validate(TRUE);
        if(!$validationResult->isValid)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => $validationResult->message));
            return $response;   
        }else{
            $sql = $this->db->prepare("UPDATE {$this->tableName}
                                        SET Fullname = %s, Event = %s, Activity = %d, EventDate = %s
                                        WHERE Id = %d", $refereeEntry->fullname, $refereeEntry->event, 
                                        $refereeEntry->activity, $refereeEntry->eventDate, $refereeEntry->id);
            $this->db->query($sql);
        }
        $response->setResponseModel((object)array('status' => TRUE, 'message' => "Успішно оновлено запис!"));
        return $response;
    }

    public function getAll()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для перегляду записів!"));
            return $response;
        }

        $year = $_GET["year"];

        $sql = $this->db->prepare("SELECT * FROM {$this->tableName} WHERE YEAR(EventDate) = %s", $year);
        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $item) 
            {
                $refereeEntry = $this->mapRefereeEntryMySQLResult($item);

                array_push($this->refereeEntries, $refereeEntry);
            }
        }
        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->refereeEntries, "message" => NULL));
        return $response;
    }

    public function delete()
    {
        $response = new ResponseModel();
        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для видалення записів!"));
            return $response;
        }

        $refereeEntry = (object)array("Id" => NULL);
        $refereeEntry = mapPostToObject($refereeEntry);

        if(!$refereeEntry->id)
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "Referee Entry Id is required!"));
            return $response;            
        }

        $sql = $this->db->prepare("DELETE FROM {$this->tableName} WHERE Id = %d", $refereeEntry->id);
        $this->db->query($sql);

        $response->setResponseModel((object)array("status" => TRUE, "message" => "Запис було успішно видалено!"));
        return $response;
    }

    private function mapRefereeEntry()
    {
        $refereeEntry = new RefereeEntry();
        $refereeEntry = mapPostToObject($refereeEntry);
        $refereeEntry->id = intval($refereeEntry->id);
        $refereeEntry->activity = intval($refereeEntry->activity);
        $refereeEntry->eventDate = convertToDate($refereeEntry->eventDate);
        return $refereeEntry;
    }

    private function mapRefereeEntryMySQLResult($result)
    {
        $refereeEntry = new RefereeEntry();
        $refereeEntry = mapMySQLResultToObject($result, $refereeEntry);
        $refereeEntry->eventDate = reverseDate($refereeEntry->eventDate);
        return $refereeEntry;
    }
}