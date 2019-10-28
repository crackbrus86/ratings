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

function ratingsTableApp()
{   
    wp_register_style('ratings-style', plugins_url('/client/dist/css/style.css?v=' . UPFRatings::$appVersion, __FILE__));
    wp_enqueue_style('ratings-style');
    wp_register_style('ratings-fontawesome', plugins_url('/client/dist/css/fontawesome-free-5.7.2-web/css/all.min.css?v=' . UPFRatings::$appVersion, __FILE__));
    wp_enqueue_style('ratings-fontawesome');
    wp_register_script('ratings-react_register', 'https://unpkg.com/react@16/umd/react.development.js');
    wp_enqueue_script('ratings-react_register');
    wp_register_script('ratings-react_dom_register', 'https://unpkg.com/react-dom@16/umd/react-dom.development.js');
    wp_enqueue_script('ratings-react_dom_register');
    wp_register_script("ratings_table_script", plugins_url("/client/dist/tables-bundle.js?v=" . UPFRatings::$appVersion, __FILE__));
    wp_enqueue_script("ratings_table_script");
    $content = <<<_END
    <div id="app-rat-tables"></div>
_END;
    echo $content;
}

add_shortcode("Ratings", "ratingsTableApp");


class UPFRatings
{
    public static $appVersion = "1.0.101719";

    public function initRating()
    {
        add_menu_page("UPF Ratings", "Рейтинги ФПУ", "manage_options", "ratings", array("UPFRatings", "ratingsManager"));
        add_submenu_page("ratings", "Рейтинги ФПУ (Установки)", "Установки", "manage_options", "ratings-settings", array("UPFRatings", "ratingsSettings"));
        add_submenu_page("ratings", "Рейтинги суддів ФПУ", "Судді ФПУ", "manage_options", "ratings-referee", array("UPFRatings", "refereeRatings"));
        wp_register_style('style', plugins_url('/client/dist/css/style.css?v=' . UPFRatings::$appVersion, __FILE__));
        wp_enqueue_style('style');
        wp_register_style('fontawesome', plugins_url('/client/dist/css/fontawesome-free-5.7.2-web/css/all.min.css?v=' . UPFRatings::$appVersion, __FILE__));
        wp_enqueue_style('fontawesome');
        wp_register_script('react_register', 'https://unpkg.com/react@16/umd/react.development.js');
        wp_enqueue_script('react_register');
        wp_register_script('react_dom_register', 'https://unpkg.com/react-dom@16/umd/react-dom.development.js');
        wp_enqueue_script('react_dom_register');
        wp_register_style('react-datetime', plugins_url('/client/dist/css/react-datetime.css?v=' . UPFRatings::$appVersion, __FILE__));
        wp_enqueue_style('react-datetime');
        wp_register_style('toastr', plugins_url('/client/dist/css/toastr.min.css?v=' . UPFRatings::$appVersion, __FILE__));
        wp_enqueue_style('toastr');
    }

    public function loadManagerScript()
    {
        wp_register_script("ratings_entries_script", plugins_url("/client/dist/entries-bundle.js?v=" . UPFRatings::$appVersion, __FILE__));
        wp_enqueue_script("ratings_entries_script");
    }

    public function ratingsManager()
    {
        UPFRatings::loadManagerScript();
        $content = <<<_END
        <div class="container-fluid">
            <h2>Рейтинги ФПУ</h2>
            <div id="app-rat-entries"></div>
        </div>
_END;
        echo $content;
    }

    public function loadRefereeRatingsScript()
    {
        wp_register_script("referee_ratings_script", plugins_url("/client/dist/referee-bundle.js?v=" . UPFRatings::$appVersion, __FILE__));
        wp_enqueue_script("referee_ratings_script");
    }

    public function refereeRatings()
    {
        UPFRatings::loadRefereeRatingsScript();
        $content = <<<_END
        <div class="container-fluid">
            <h2>Рейтинги суддів ФПУ</h2>
            <div id="app-referee-rat"></div>
        </div>
_END;
        echo $content;
    }

    public function loadSettingsScript()
    {
        wp_register_script("ratings_settings_script", plugins_url("/client/dist/settings-bundle.js?v=" . UPFRatings::$appVersion, __FILE__));
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

    public function loadTablesScript()
    {
        wp_register_script("ratings_table_script", plugins_url("/client/dist/tables-bundle.js?v=" . UPFRatings::$appVersion, __FILE__));
        wp_enqueue_script("ratings_table_script");
    }

    public function ratingsTable()
    {
        UPFRatings::loadTablesScript();
        $content = <<<_END
        <div id="app-rat-tables"></div>
_END;
    }

    public function initDb()
    {
        require_once(RATING_DIR . "./server/dbInit.php");
    }
}
