<?php
class Rating
{
    public $fullname;

    public $rating;

    public $gender;

    public $details;

    function __construct(string $fullname, int $rating, string $gender, string $details)
    {
        $this->fullname = $fullname;
        
        $this->rating = $rating;

        $this->gender = $gender;

        $this->details = $details;
    }
}
?>