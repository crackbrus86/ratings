<?php
class RefereeSetting
{
    public $id;

    public $activity;

    public $coefficient;

    public function __construct($id = null, $activity = null, $coefficient = null)
    {
        $this->id = $id;

        $this->activity = $activity;

        $this->coefficient = $coefficient;
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

        if(!$this->activity)
        {
            $validation->isValid = FALSE;

            $validation->message = "Activity is required!";

            return $validation;
        }

        if(!$this->coefficient)
        {
            $validation->isValid = FALSE;

            $validation->message = "Coefficient is required!";

            return $validation;
        }

        if(!is_float($this->coefficient))
        {
            $validation->isValid = FALSE;

            $validation->message = "Coefficient is not float point number!";

            return $validation;
        }

        if(strlen($this->activity) > 300)
        {
            $validation->isValid = FALSE;

            $validation->message = "Activity description should not be more than 300 characters long!";

            return $validation;
        }

        if($this->coefficient <= 0 || $this->coefficient > 2)
        {
            $validation->isValid = FALSE;

            $validation->message = "Coefficient should be in range (0, 2]!";

            return $validation;
        }

        return $validation;
    }
}
?>