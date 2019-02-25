<?php
global $wpdb;
$charset_collate = "DEFAULT CHARSET SET {$wpdb->charset} COLLATE {$wpdb->collate}";
require_once(ABSPATH . "wp-admin/includes/upgrade.php");

$prefix = $wpdb->get_blog_prefix() . "rat_";
$pointTableName = $prefix . "point";
$sql = "CREATE TABLE IF NOT EXISTS {$pointTableName} (
    PointId INT NOT NULL AUTO_INCREMENT,
    Target NVARCHAR(50) NOT NULL,
    Value INT,
    Place INT,
    PRIMARY KEY(PointId)
) {$charset_collate}";
dbDelta($sql);