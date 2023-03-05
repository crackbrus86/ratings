<?php
require_once "../Models/Competition.php";
require_once "../connect.php";
require_once "../core.php";

class CompetitionService
{
    private $db;

    private $competitions;

    private $active_competitions;

    private $table_name;

    public function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->competitions = array(
            new Competition(1, "Всесвітні ігри", 1, "WorldGames", TRUE, "ВІ", 1),
            new Competition(2, "Чемпіонат світу", 2, "OpenWorldChampionship", TRUE, "ЧС", 1),
            new Competition(3, "Чемпіонат Європи", 3, "OpenEuropeanChampionship", TRUE, "ЧЄ", 1),
            new Competition(4, "Чемпіонат України", 4, "OpenUkraineChampionship", FALSE, "ЧУ", 1),
            new Competition(5, "Чемпіонат світу серед юніорів", 5, "JuniorWorldChampionship", TRUE, "ЧСю", 1),
            new Competition(6, "Чемпіонат Європи серед юніорів", 6, "JuniorEuropeanChampionship", TRUE, "ЧЄю", 1),
            new Competition(7, "Чемпіонат України серед юніорів", 7, "JuniorUkraineChampionship", FALSE, "ЧУю", 1),
            new Competition(8, "Чемпіонат світу серед юнаків", 8, "SubJuniorWorldChampionship", TRUE, "ЧСюн", 1),
            new Competition(9, "Чемпіонат Європи серед юнаків", 9, "SubJuniorEuropeanChampionship", TRUE, "ЧЄюн", 1),
            new Competition(10, "Чемпіонат України серед юнаків", 10, "SubJuniorUkraineChampionship", FALSE, "ЧУюн", 1),
            new Competition(11, "Кубок світу", 11, "WorldCup", FALSE, "КС", 1),
            new Competition(12, "Кубок Європи", 12, "EuropeanCup", TRUE, "КЄ", 1),
            new Competition(13, "Кубок України", 13, "UkraineCup", FALSE, "КУ", 1),
            new Competition(14, "Кубок Дунаю", 14, "DonauCup", TRUE, "КД", 1)
        );

        $this->table_name = $this->db->get_blog_prefix() . "rat_competition";
        $this->active_competitions = array();
    }

    function initial_creation()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для створення змагань!"));

            return $response;
        }

        $sql = $this->db->prepare("SELECT * FROM {$this->table_name}");
        $results = $this->db->get_results($sql);

        if(count($results) === 0)
        {
            foreach($this->competitions as $competition)
            {
                $sql = $this->db->prepare("INSERT INTO {$this->table_name} (Id, Name, DbName, SortOrder, RatingUPF, ShortName, IsActive)
                    VALUES (%d, %s, %s, %d, %d, %s, %d)", 
                    $competition->id, $competition->name, $competition->dbName, $competition->sortOrder, !!$competition->ratingUPF ? 1 : 0, $competition->shortName, 1);
                $this->db->query($sql);
            }

            $response->setResponseModel((object)array('status' => TRUE, 'message' => "Успішно створено список змагань!"));
        } else {
            $response->setResponseModel((object)array('status' => TRUE, 'message' => "Список змагань уже ініціалізований!"));
        }

        return $response;
    }

    function get_active_competitions()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для отримання змагань!"));

            return $response;
        }

        $sql = $this->db->prepare("SELECT Id, Name, DbName, SortOrder, RatingUPF, ShortName, IsActive 
            FROM {$this->table_name}
            WHERE IsActive = 1");
        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach($results as $item)
            {
                $competition = $this->mapMySQLResultToCompetition($item);
                array_push($this->active_competitions, $competition);
            }
        }

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->active_competitions, "message" => NULL));

        return $response;
    }

    function get_all_competitions()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array('status' => FALSE, 'message' => "У Вас недостатньо прав для отримання змагань!"));

            return $response;
        }

        $sql = $this->db->prepare("SELECT Id, Name, DbName, SortOrder, RatingUPF, ShortName, IsActive 
            FROM {$this->table_name}");
        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach($results as $item)
            {
                $competition = $this->mapMySQLResultToCompetition($item);
                array_push($this->active_competitions, $competition);
            }
        }

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->active_competitions, "message" => NULL));

        return $response;  
    }

    public function create_competition()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "У Вас недостатньо прав для створення змагань!"));

            return $response;
        }

        $sql = $this->db->prepare("SELECT MAX(SortOrder) AS MaxSortOrder FROM {$this->table_name}");
        $result = $this->db->get_row($sql);
        $next_sort_order = $result->MaxSortOrder + 1;

        $competition = $this->mapCompetition($next_sort_order);

        $validationResult = $competition->validate();

        if(!$validationResult->isValid)
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => $validationResult->message));
            return $response;
        } else {
            $sql = $this->db->prepare("INSERT INTO {$this->table_name} (Id, Name, DbName, SortOrder, RatingUPF, ShortName, IsActive)
            VALUES (%d, %s, %s, %d, %d, %s, %d)", $competition->sortOrder, $competition->name, $competition->dbName, $competition->sortOrder,
            $competition->ratingUPF, $competition->shortName, $competition->isActive);

            $this->db->query($sql);
        }

        $response->setResponseModel((object)array("status" => TRUE, "message" => "Успішно створено змагання!"));
        return $response;
    }

    public function update_competition()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "У Вас недостатньо прав для створення змагань!"));
            return $response;
        }

        $competition = $this->mapCompetition();

        $validationResult = $competition->validate(TRUE);

        if(!$validationResult->isValid)
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => $validationResult->message));
            return $response;
        } else {
            $sql = $this->db->prepare("UPDATE {$this->table_name} SET Name = %s, RatingUPF = %d
            WHERE Id = %d", $competition->name, $competition->ratingUPF, $competition->id);

            $this->db->query($sql);
        }

        $response->setResponseModel((object)array("status" => TRUE, "message" => "Успішно оновлено змагання!"));
        return $response;
    }

    public function deactivate_competition()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "У Вас недостатньо прав для видалення змагань!"));
            return $response;
        }

        $targetCompetition = (object)array("id" => NULL);

        $targetCompetition = mapPostToObject($targetCompetition);

        if(!$targetCompetition->id)
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "Competition Id is required field"));

            return $response;
        }

        $sql = $this->db->prepare("UPDATE {$this->table_name} SET IsActive = 0 WHERE Id = %d", $targetCompetition->id);

        $this->db->query($sql);

        $response->setResponseModel((object)array("status" => TRUE, "message" => "Змагання було успішно видалене!"));

        return $response;
    }

    public function re_activate_competition()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "У Вас недостатньо прав для відновлення змагань!"));
            return $response;
        }

        $targetCompetition = (object)array("id" => NULL);

        $targetCompetition = mapPostToObject($targetCompetition);

        if(!$targetCompetition->id)
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "Competition Id is required field"));

            return $response;
        }

        $sql = $this->db->prepare("UPDATE {$this->table_name} SET IsActive = 1 WHERE Id = %d", $targetCompetition->id);

        $this->db->query($sql);

        $response->setResponseModel((object)array("status" => TRUE, "message" => "Змагання було успішно відновлене!"));

        return $response;
    }

    private function mapMySQLResultToCompetition($result)
    {
        $competition = new Competition();

        $competition = mapMySQLResultToObject($result, $competition);

        $competition->ratingUPF = $result->RatingUPF == 1 ? TRUE : FALSE;

        $competition->isActive = $result->IsActive == 1 ? TRUE : FALSE;

        return $competition;
    }

    private function mapCompetition($next_sort_order = NULL)
    {
        $competition = new Competition();

        $competition = mapPostToObject($competition);

        $competition->ratingUPF = $competition->ratingUPF === 'true' ? TRUE : FALSE;

        $competition->isActive = $competition->isActive === 'true' ? TRUE : FALSE;
        
        $competition->sortOrder = $next_sort_order === NULL ? $competition->sortOrder : $next_sort_order;

        return $competition;
    }
}