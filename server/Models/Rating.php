<?php
class Rating
{
    public $fullname;

    public $rating;

    public $gender;

    public $details;

    public $detailsData;

    function __construct(string $fullname, int $rating, string $gender, string $details, array $detailsData = array())
    {
        $this->fullname = $fullname;
        
        $this->rating = $rating;

        $this->gender = $gender;

        $this->details = $details;

        $this->detailsData = $detailsData;
    }
}
?>