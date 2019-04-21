<?php
class UPFRange
{
    public $id;

    public $competition;

    public $place;

    public $compType;
    
    public $range;

    function __construct()
    {
        $this->id = NULL;

        $this->competition = NULL;

        $this->place = NULL;

        $this->compType = NULL;

        $this->range = NULL;
    }

    public function validate()
    {
        $validation = new stdClass();

        $validation->isValid = TRUE;

        $validation->message = NULL;

        if(!$this->competition)
        {
            $validation->isValid = FALSE;

            $validation->message = "Competition is required!";

            return $validation;
        }

        if(!$this->place)
        {
            $validation->isValid = FALSE;

            $validation->message = "Place is required!";

            return $validation;
        }

        return $validation;
    }
}