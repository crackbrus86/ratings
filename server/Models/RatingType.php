<?php
class RatingType
{
    public $id;

    public $ratingType;

    public $title;

    public $organization;

    public $type;

    function __construct($id, $ratingType, $title, $organization, $type)
    {
        $this->id = $id;

        $this->ratingType = $ratingType;

        $this->title = $title;

        $this->organization = $organization;

        $this->type = $type;
    }
}
?>