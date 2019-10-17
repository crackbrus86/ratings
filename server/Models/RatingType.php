<?php
class RatingType
{
    public $id;

    public $ratingType;

    public $title;

    public $organization;

    public $type;

    public $isActive;

    function __construct($id, $ratingType, $title, $organization, $type, $isActive = FALSE)
    {
        $this->id = $id;

        $this->ratingType = $ratingType;

        $this->title = $title;

        $this->organization = $organization;

        $this->type = $type;

        $this->isActive = $isActive;
    }
}
?>