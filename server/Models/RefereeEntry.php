<?php
class RefereeEntry
{
    public $id;
    public $fullname;
    public $event;
    public $activity;
    public $eventDate;

    public function __construct()
    {
        $this->id = NULL;
        $this->fullname = "";
        $this->event = "";
        $this->activity = NULL;
        $this->eventDate = NULL;
    }

    public function validate($isEdit = FALSE)
    {
        $validation = new stdClass();
        $validation->isValid = TRUE;
        $validation->message = NULL;

        if($isEdit && !$this->id)
        {
            $validation->isValid = FALSE;
            $validation->message = "Id is required!";
            return $validation;
        }

        if(!$this->fullname)
        {
            $validation->isValid = FALSE;
            $validation->message = "Full name is required!";
            return $validation;
        }

        if(!$this->event)
        {
            $validation->isValid = FALSE;
            $validation->message = "Event is required!";
            return $validation;
        }

        if(!$this->activity)
        {
            $validation->isValid = FALSE;
            $validation->message = "Activity is required!";
            return $validation;
        }

        if(!$this->eventDate)
        {
            $validation->isValid = FALSE;
            $validation->message = "Event Date is required!";
            return $validation;
        }

        return $validation;
    }
}
?>