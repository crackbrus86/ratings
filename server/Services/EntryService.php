<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/Entry.php";

class EntryService
{
    private $db;
    private $tableName;

    public function __construct()
    {
        global $wpdb;
        $this->db = $wpdb;
        $this->tableName = $this->db->get_blog_prefix() . "rat_entry";
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
        $entry->eventDate = convertDate(escape($_POST["eventDate"]));

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
}