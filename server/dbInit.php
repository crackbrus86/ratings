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

$entryTableName = $prefix . "entry";
$sql = "CREATE TABLE IF NOT EXISTS {$entryTableName} (
    RatingEntryId INT NOT NULL AUTO_INCREMENT,
    Fullname NVARCHAR(300) NOT NULL,
    Type NVARCHAR(50) NOT NULL,
    Event NVARCHAR(50) NOT NULL,
    Place INT NOT NULL,
    EventDate DATETIME NOT NULL,
    Gender NVARCHAR(1) NOT NULL,
    Division NVARCHAR(10) NULL,
    CompType NVARCHAR(50) NULL
    PRIMARY KEY (RatingEntryId)
) {$charset_collate}";
dbDelta($sql);