<?php
global $wpdb;
$charset_collate = "DEFAULT CHARSET SET {$wpdb->charset} COLLATE {$wpdb->collate}";
require_once(ABSPATH . "wp-admin/includes/upgrade.php");

$prefix = $wpdb->get_blog_prefix() . "rat_";

$pointTableName = $prefix . "point";
$sql = "CREATE TABLE IF NOT EXISTS {$pointTableName} (
    PointId INT NOT NULL AUTO_INCREMENT,
    Target VARCHAR(50) NOT NULL,
    Value INT,
    Place INT,
    PRIMARY KEY(PointId)
) {$charset_collate}";
dbDelta($sql);

$entryTableName = $prefix . "entry";
$sql = "CREATE TABLE IF NOT EXISTS {$entryTableName} (
    RatingEntryId INT NOT NULL AUTO_INCREMENT,
    Fullname VARCHAR(300) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Event VARCHAR(50) NOT NULL,
    Place INT NOT NULL,
    EventDate DATETIME NOT NULL,
    Gender VARCHAR(1) NOT NULL,
    Division VARCHAR(10) NULL,
    CompType VARCHAR(50) NULL,
    Wilks FLOAT(10, 2) NULL,
    Region VARCHAR(50) NULL,
    Coach VARCHAR(300) NULL,
    Fst VARCHAR(300) NULL,
    School VARCHAR(300) NULL,
    PRIMARY KEY (RatingEntryId)
) {$charset_collate}";
dbDelta($sql);

$rangeTableName = $prefix . "range";
$sql = "CREATE TABLE IF NOT EXISTS {$rangeTableName} (
    Id INT NOT NULL AUTO_INCREMENT,
    Competition VARCHAR(300) NOT NULL,
    Place INT NOT NULL,
    CompType VARCHAR(50) NULL,
    `Range` INT NULL,
    PRIMARY KEY (Id)
) {$charset_collate}";
dbDelta($sql);

$refereeSettingTableName = $prefix . "referee_setting";
$sql = "CREATE TABLE IF NOT EXISTS {$refereeSettingTableName} (
    Id INT NOT NULL AUTO_INCREMENT,
    Activity VARCHAR(300) NOT NULL,
    Coefficient FLOAT(10, 2) NOT NULL,
    PRIMARY KEY (Id)
) {$charset_collate}";
dbDelta($sql);

$refereeEntryTableName = $prefix . "referee_entry";
$sql = "CREATE TABLE IF NOT EXISTS {$refereeEntryTableName} (
    Id INT NOT NULL AUTO_INCREMENT,
    Fullname VARCHAR(300) NOT NULL,
    Event VARCHAR(50) NOT NULL,
    Activity INT NOT NULL,
    EventDate DATETIME NOT NULL,
    PRIMARY KEY (Id)
) {$charset_collate}";
dbDelta($sql);

$ratingTypeTableName = $prefix . "rating_type";
$sql = "CREATE TABLE IF NOT EXISTS {$ratingTypeTableName} (
    Id INT NOT NULL AUTO_INCREMENT,
    RatingType VARCHAR(50) NOT NULL,
    Title VARCHAR(300) NOT NULL,
    Organization VARCHAR(50) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    IsActive TINYINT NOT NULL,
    PRIMARY KEY (Id)
) {$charset_collate}";
dbDelta($sql);