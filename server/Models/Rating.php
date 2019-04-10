<?php
class Rating
{
    public $fullname;

    public $rating;

    function __construct(string $fullname, int $rating)
    {
        $this->fullname = $fullname;
        
        $this->rating = $rating;
    }
}
?>