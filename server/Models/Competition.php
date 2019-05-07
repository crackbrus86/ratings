<?php
class Copmetition
{
    public $id;
    public $name;
    public $dbName;
    public $sortOrder;
    public $ratingUPF;
    public $shortName;

    public function __construct($id, $name, $sortOrder, $dbName, $ratingUPF, $shortName)
    {
        $this->id = $id;
        $this->name = $name;
        $this->sortOrder = $sortOrder;
        $this->dbName = $dbName;
        $this->ratingUPF = $ratingUPF;
        $this->shortName = $shortName;
    }
}
?>