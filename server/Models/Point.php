<?php
class Point
{
    public $pointId;
    public $target;
    public $value;
    public $place;

    public function __construct(int $id, string $target, int $value, int $place)
    {
        $this->pointId = $id;
        $this->target = $target;
        $this->value = $value;
        $this->place = $place;
    }
}