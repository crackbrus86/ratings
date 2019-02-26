<?php
/*
* Plugin Name: UPF Rating
* Description: UPF Ratings
* Verson: 1.0
* Author: Salivon Eugene
*/
define('RATING_DIR', plugin_dir_path(__FILE__));
add_action("admin_menu", array("UPFRatings", "initRating"));
add_action("admin_init", array("UPFRatings", "initDb"));


class UPFRatings {
    public static $appVersion = "1.0(021819)";

    public function initRating(){
        add_menu_page("UPF Ratings", "Рейтинги ФПУ", "manage_options", "ratings", array("UPFRatings", "ratingsManager"));
        add_submenu_page("ratings", "Рейтинги ФПУ (Установки)", "Установки", "manage_options", "ratings-settings", array("UPFRatings", "ratingsSettings"));
        wp_register_style('style', plugins_url( '/client/dist/css/style.css?v=' . $appVersion, __FILE__ ));
        wp_enqueue_style( 'style');
        wp_register_style('fontawesome', plugins_url( '/client/dist/css/fontawesome-free-5.7.2-web/css/all.min.css?v=' . $appVersion, __FILE__ ));
        wp_enqueue_style( 'fontawesome');
    }

    public function ratingsManager()
    {
        $content = <<<_END
        <div class="container-fluid">
            <h2>Рейтинги ФПУ</h2>
            <div id="app-rat-mng"></div>
        </div>
_END;
        echo $content;
    }

    public function loadSettingsScript()
    {
        wp_register_script("ratings_settings_script", plugins_url("/client/dist/settings-bundle.js?v=" . $appVersion, __FILE__));
        wp_enqueue_script("ratings_settings_script");
    }

    public function ratingsSettings()
    {
        UPFRatings::loadSettingsScript();
        $content = <<<_END
        <div class="container-fluid">
            <h2>Рейтинги ФПУ (Установки)</h2>
            <div id="app-rat-settings"></div>
        </div>
_END;
        echo $content;
    }

    public function initDb()
    {
        require_once(RATING_DIR . "./server/dbInit.php");
    }

}
?>