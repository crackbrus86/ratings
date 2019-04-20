<?php
class Copmetition
{
    public $id;
    public $name;
    public $dbName;
    public $sortOrder;
    public $ratingUPF;

    public function __construct(int $id, string $name, int $sortOrder, string $dbName, bool $ratingUPF)
    {
        $this->id = $id;
        $this->name = $name;
        $this->sortOrder = $sortOrder;
        $this->dbName = $dbName;
        $this->ratingUPF = $ratingUPF;
    }
}
?>