<?php
class Competition
{
    public $id;
    public $name;
    public $dbName;
    public $sortOrder;
    public $ratingUPF;
    public $shortName;
    public $isActive;

    public function __construct($id = NULL, $name = NULL, $sortOrder = NULL, $dbName = NULL, $ratingUPF = NULL, $shortName = NULL, $isActive = NULL)
    {
        $this->id = $id;
        $this->name = $name;
        $this->sortOrder = $sortOrder;
        $this->dbName = $dbName;
        $this->ratingUPF = $ratingUPF;
        $this->shortName = $shortName;
        $this->isActive = $isActive;
    }

    public function validate($isEdit = FALSE)
    {
        $validation = new stdClass();
        $validation->isValid = TRUE;
        $validation->message = NULL;

        if($isEdit && !$this->id)
        {
            $validation->isValid = FALSE;
            $validation->message = "Id is required";
            return $validation;
        }

        if(!$this->name)
        {
            $validation->isValid = FALSE;
            $validation->message = "Name is required field";
            return $validation;
        }

        if(!$this->dbName)
        {
            $validation->isValid = FALSE;
            $validation->message = "DbName is required field";
            return $validation;
        }

        if(!$this->shortName)
        {
            $validation->isValid = FALSE;
            $validation->message = "ShortName is required field";
        }

        return $validation;
    }
}
?>