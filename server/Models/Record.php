<?php
class Record
{
    public $id;
    public $name;
    public $dbName;
    public $sortOrder;

    public function __construct(int $id, string $name, int $sortOrder, string $dbName)
    {
        $this->id = $id;
        $this->name = $name;
        $this->sortOrder = $sortOrder;
        $this->dbName = $dbName;
    }
}
?>