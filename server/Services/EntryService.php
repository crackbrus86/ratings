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
        if(!current_user_can("edit_others_pages")) return "У Вас недостатньо прав для створення записів!";

        $entry = new Entry();
        $entry->ratingEntryId = intval(escape($_POST["ratingEntryId"]));
        $entry->fullname = escape($_POST["fullname"]);
        $entry->type = escape($_POST["type"]);
        $entry->event = escape($_POST["event"]);
        $entry->place = intval(escape($_POST["place"]));
        $entry->eventDate = convertToDate(escape($_POST["eventDate"]));

        $validationResult = $entry->validate();

        if(!$validationResult->isValid) 
        {
            return $validationResult->message;
        }else{
            $sql = $this->db->prepare("INSERT INTO {$this->tableName} (Fullname, Type, Event, Place, EventDate) 
                VALUES (%s, %s, %s, %d, %s)", $entry->fullname, $entry->type, $entry->event, $entry->place, $entry->eventDate);
            $this->db->query($sql);
        }

        return "";
    }

    public function getEntries()
    {
        $response = getResponseModel();
        if(!current_user_can("edit_others_pages")) {
            $response->status = FALSE;
            $response->message = "У Вас недостатньо прав для створення записів!";
            return $response;
        }

        $year = $_GET["year"];

        $sql = $this->db->prepare("SELECT * FROM {$this->tableName} WHERE YEAR(EventDate) >= %s", $year);
        $results = $this->db->get_results($sql);
        if(count($results))
        {
            foreach ($results as $item) {
                $entry = new Entry();

                $entry->ratingEntryId = $item->RatingEntryId;
                $entry->fullname = $item->Fullname;
                $entry->type = $item->Type;
                $entry->event = $item->Event;
                $entry->place = $item->Place;
                $entry->eventDate = reverseDate($item->EventDate);

                array_push($this->entries, $entry);
            }
        }
        $response->status = TRUE;
        $response->data = $this->entries;
        return $response;
    }
}