<?php
class Rating
{
    public $fullname;

    public $rating;

    public $gender;

    public $details;

    public $detailsData;

    public $wilks;

    function __construct($fullname, $rating, $gender, $details, $detailsData = array(), $wilks = NULL)
    {
        $this->fullname = $fullname;
        
        $this->rating = $rating;

        $this->gender = $gender;

        $this->details = $details;

        $this->detailsData = $detailsData;

        $this->wilks = $wilks;
    }
}
?>