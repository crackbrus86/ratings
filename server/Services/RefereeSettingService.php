<?php
require_once "../connect.php";
require_once "../core.php";
require_once "../Models/RefereeSetting.php";

class RefereeSettingService
{
    private $db;

    private $tableName;

    private $refereeSettings;

    public function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;

        $this->tableName = $this->db->get_blog_prefix() . "rat_referee_setting";

        $this->refereeSettings = array();
    }

    public function getAll()
    {
        $response = new ResponseModel();

        if(!current_user_can("edit_others_pages"))
        {
            $response->setResponseModel((object)array("status" => FALSE, "message" => "У Вас недостатньо прав для отримання цих даних!"));

            return $response;
        }

        $sql = $this->db->prepare("SELECT Id, Activity, Coefficient FROM {$this->tableName}", NULL);

        $results = $this->db->get_results($sql);

        if(count($results))
        {
            foreach ($results as $item) {
                $setting = $this->mapRefereeSettingToMySQLResult($item);

                array_push($this->refereeSettings, $setting);
            }
        }

        $response->setResponseModel((object)array("status" => TRUE, "data" => $this->refereeSettings, "message" => NULL));

        return $response;
    }

    private function mapRefereeSettingToMySQLResult($result)
    {
        $setting = new RefereeSetting();

        $setting = mapMySQLResultToObject($result, $setting);

        return $setting;
    }
}
?>