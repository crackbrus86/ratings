<?php
class RatingType
{
    public $id;

    public $ratingType;

    public $title;

    public $organization;

    function __construct($id, $ratingType, $title, $organization)
    {
        $this->id = $id;

        $this->ratingType = $ratingType;

        $this->title = $title;

        $this->organization = $organization;
    }
}
?>