<?php
class Region
{
    public $id;

    public $title;

    function __construct(int $id, string $title)
    {
        $this->id = $id;

        $this->title = $title;
    }
}
?>