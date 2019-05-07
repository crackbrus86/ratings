<?php
class Entry
{
    public $ratingEntryId;
    public $fullname;
    public $type;
    public $event;
    public $place;
    public $eventDate;
    public $gender;
    public $division;
    public $compType;
    public $wilks;
    public $region;
    public $coach;
    public $fst;
    public $school;

    public function __construct()
    {
        $this->ratingEntryId = NULL;
        $this->fullname = "";
        $this->type = "";
        $this->event = "";
        $this->place = NULL;
        $this->eventDate = NULL;
        $this->gender = NULL;
        $this->division = NULL;
        $this->compType = NULL;
        $this->wilks = NULL;
        $this->region = NULL;
        $this->coach = "";
        $this->fst = "";
        $this->school = "";
    }

    public function validate($isEdit = FALSE)
    {
        $validation = new stdClass();
        $validation->isValid = TRUE;
        $validation->message = NULL;

        if($isEdit && !$this->ratingEntryId)
        {
            $validation->isValid = FALSE;
            $validation->message = "Entry Id is required!";
            return $validation;
        } 

        if(!$this->fullname)
        {
            $validation->isValid = FALSE;
            $validation->message = "Fullname is required!";
            return $validation;
        }

        if(!$this->type)
        {
            $validation->isValid = FALSE;
            $validation->message = "Type is required!";
            return $validation;
        }        
        
        if(!$this->event)
        {
            $validation->isValid = FALSE;
            $validation->message = "Event is required!";
            return $validation;
        }   
        
        if(!$this->place)
        {
            $validation->isValid = FALSE;
            $validation->message = "Place is required!";
            return $validation;
        }  
        
        if(!$this->eventDate)
        {
            $validation->isValid = FALSE;
            $validation->message = "Event Date is required!";
            return $validation;
        }  

        if(!$this->gender)
        {
            $validation->isValid = FALSE;
            $validation->message = "Gender is required!";
            return $validation;
        }

        if(!$this->division)
        {
            $validation->isValid = FALSE;

            $validation->message = "Division is required!";

            return $validation;
        }

        if(!$this->compType)
        {
            $validation->isValid = FALSE;

            $validation->message = "Competition Type is required!";

            return $validation;
        }

        if(!$this->region)
        {
            $validation->isValid = FALSE;

            $validation->message = "Region is required!";

            return $validation;
        }
         
        return $validation; 
    }
}
?>