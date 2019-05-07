<?php
class CompetitionType
{
    public $name;

    public $displayName;

    public function __construct($name, $displayName)
    {
        $this->name = $name;

        $this->displayName = $displayName;
    }
}
?>