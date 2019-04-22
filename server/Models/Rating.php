<?php
class Rating
{
    public $fullname;

    public $rating;

    public $gender;

    public $details;

    public $detailsData;

    public $wilks;

    function __construct(string $fullname, int $rating, string $gender, string $details, array $detailsData = array(), float $wilks = NULL)
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