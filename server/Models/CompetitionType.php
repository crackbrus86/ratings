<?php
class CompetitionType
{
    public $name;

    public $displayName;

    public function __construct(string $name, string $displayName)
    {
        $this->name = $name;

        $this->displayName = $displayName;
    }
}
?>