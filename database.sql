-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: CRIMINAL_DATABASE
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ARREST`
--

DROP TABLE IF EXISTS `ARREST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ARREST` (
  `arrest_id` int unsigned NOT NULL AUTO_INCREMENT,
  `criminal_id` int unsigned NOT NULL,
  `crime_id` int unsigned NOT NULL,
  `officer_id` int unsigned NOT NULL,
  `arrest_date` date NOT NULL,
  `arrest_location_id` int unsigned NOT NULL,
  `charge` text,
  `bail_status` enum('Granted','Denied','Pending') NOT NULL,
  `arrest_time` time NOT NULL,
  PRIMARY KEY (`arrest_id`),
  KEY `criminal_id` (`criminal_id`),
  KEY `crime_id` (`crime_id`),
  KEY `officer_id` (`officer_id`),
  KEY `arrest_location_id` (`arrest_location_id`),
  CONSTRAINT `ARREST_ibfk_1` FOREIGN KEY (`criminal_id`) REFERENCES `CRIMINAL` (`criminal_id`),
  CONSTRAINT `ARREST_ibfk_2` FOREIGN KEY (`crime_id`) REFERENCES `CRIME` (`crime_id`),
  CONSTRAINT `ARREST_ibfk_3` FOREIGN KEY (`officer_id`) REFERENCES `OFFICER` (`officer_id`),
  CONSTRAINT `ARREST_ibfk_4` FOREIGN KEY (`arrest_location_id`) REFERENCES `LOCATION` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ARREST`
--

LOCK TABLES `ARREST` WRITE;
/*!40000 ALTER TABLE `ARREST` DISABLE KEYS */;
/*!40000 ALTER TABLE `ARREST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRIME`
--

DROP TABLE IF EXISTS `CRIME`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRIME` (
  `crime_id` int unsigned NOT NULL AUTO_INCREMENT,
  `location_id` int unsigned NOT NULL,
  `crime_type_id` int unsigned NOT NULL,
  `crime_date` date NOT NULL,
  `crime_time` time DEFAULT NULL,
  `crime_description` text,
  `crime_status` enum('Open','Closed','Under Investigation') NOT NULL,
  `damage_estimate` decimal(15,2) DEFAULT NULL,
  `reported_by` int unsigned DEFAULT NULL,
  PRIMARY KEY (`crime_id`),
  KEY `location_id` (`location_id`),
  KEY `crime_type_id` (`crime_type_id`),
  KEY `reported_by` (`reported_by`),
  CONSTRAINT `CRIME_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `LOCATION` (`location_id`),
  CONSTRAINT `CRIME_ibfk_2` FOREIGN KEY (`crime_type_id`) REFERENCES `CRIME_TYPE` (`crime_type_id`),
  CONSTRAINT `CRIME_ibfk_3` FOREIGN KEY (`reported_by`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRIME`
--

LOCK TABLES `CRIME` WRITE;
/*!40000 ALTER TABLE `CRIME` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRIME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRIME_SUSPECT`
--

DROP TABLE IF EXISTS `CRIME_SUSPECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRIME_SUSPECT` (
  `crime_id` int unsigned NOT NULL,
  `suspect_id` int unsigned NOT NULL,
  `added_date` date NOT NULL,
  `notes` text,
  PRIMARY KEY (`crime_id`,`suspect_id`),
  KEY `suspect_id` (`suspect_id`),
  CONSTRAINT `CRIME_SUSPECT_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `CRIME` (`crime_id`),
  CONSTRAINT `CRIME_SUSPECT_ibfk_2` FOREIGN KEY (`suspect_id`) REFERENCES `SUSPECT` (`suspect_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRIME_SUSPECT`
--

LOCK TABLES `CRIME_SUSPECT` WRITE;
/*!40000 ALTER TABLE `CRIME_SUSPECT` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRIME_SUSPECT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRIME_TYPE`
--

DROP TABLE IF EXISTS `CRIME_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRIME_TYPE` (
  `crime_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `crime_type_name` varchar(100) NOT NULL,
  `crime_severity_level` enum('Low','Medium','High','Critical') NOT NULL,
  `crime_description` text,
  PRIMARY KEY (`crime_type_id`),
  UNIQUE KEY `crime_type_name` (`crime_type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRIME_TYPE`
--

LOCK TABLES `CRIME_TYPE` WRITE;
/*!40000 ALTER TABLE `CRIME_TYPE` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRIME_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRIME_VICTIM`
--

DROP TABLE IF EXISTS `CRIME_VICTIM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRIME_VICTIM` (
  `crime_id` int unsigned NOT NULL,
  `victim_id` int unsigned NOT NULL,
  `injury_level` enum('None','Minor','Moderate','Severe','Fatal') DEFAULT NULL,
  `statement` text,
  PRIMARY KEY (`crime_id`,`victim_id`),
  KEY `victim_id` (`victim_id`),
  CONSTRAINT `CRIME_VICTIM_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `CRIME` (`crime_id`),
  CONSTRAINT `CRIME_VICTIM_ibfk_2` FOREIGN KEY (`victim_id`) REFERENCES `VICTIM` (`victim_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRIME_VICTIM`
--

LOCK TABLES `CRIME_VICTIM` WRITE;
/*!40000 ALTER TABLE `CRIME_VICTIM` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRIME_VICTIM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRIMINAL`
--

DROP TABLE IF EXISTS `CRIMINAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRIMINAL` (
  `criminal_id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `address_id` int unsigned DEFAULT NULL,
  `photo_url` text,
  `status` enum('Active','Arrested','Imprisoned','Released','Deceased','Absconding','Under_Trial','Acquitted') NOT NULL,
  PRIMARY KEY (`criminal_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `CRIMINAL_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `LOCATION` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRIMINAL`
--

LOCK TABLES `CRIMINAL` WRITE;
/*!40000 ALTER TABLE `CRIMINAL` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRIMINAL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRIMINAL_CRIME`
--

DROP TABLE IF EXISTS `CRIMINAL_CRIME`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRIMINAL_CRIME` (
  `crime_id` int unsigned NOT NULL,
  `criminal_id` int unsigned NOT NULL,
  `criminal_role` enum('Primary','Accomplice','Accessory') NOT NULL DEFAULT 'Primary',
  PRIMARY KEY (`crime_id`,`criminal_id`),
  KEY `criminal_id` (`criminal_id`),
  CONSTRAINT `CRIMINAL_CRIME_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `CRIME` (`crime_id`),
  CONSTRAINT `CRIMINAL_CRIME_ibfk_2` FOREIGN KEY (`criminal_id`) REFERENCES `CRIMINAL` (`criminal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRIMINAL_CRIME`
--

LOCK TABLES `CRIMINAL_CRIME` WRITE;
/*!40000 ALTER TABLE `CRIMINAL_CRIME` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRIMINAL_CRIME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRIMINAL_CRIME_HISTORY`
--

DROP TABLE IF EXISTS `CRIMINAL_CRIME_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRIMINAL_CRIME_HISTORY` (
  `history_id` int unsigned NOT NULL AUTO_INCREMENT,
  `criminal_id` int unsigned NOT NULL,
  `crime_id` int unsigned NOT NULL,
  `verdict` enum('Guilty','Not Guilty','Dismissed','Pending','Mistrial','Retrial') NOT NULL,
  `sentence_type` enum('Imprisonment','Fine','Community Service','Probation','Death Penalty','Other') NOT NULL,
  `sentence_duration` varchar(50) DEFAULT NULL,
  `prison_name` varchar(120) DEFAULT NULL,
  `imprisonment_date` date DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `parole_status` enum('Granted','Denied','Pending') DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`history_id`),
  KEY `criminal_id` (`criminal_id`),
  KEY `crime_id` (`crime_id`),
  CONSTRAINT `CRIMINAL_CRIME_HISTORY_ibfk_1` FOREIGN KEY (`criminal_id`) REFERENCES `CRIMINAL` (`criminal_id`),
  CONSTRAINT `CRIMINAL_CRIME_HISTORY_ibfk_2` FOREIGN KEY (`crime_id`) REFERENCES `CRIME` (`crime_id`),
  CONSTRAINT `CHECK_DATE_VALIDITY` CHECK (((`release_date` is null) or ((`imprisonment_date` is not null) and (`imprisonment_date` <= `release_date`))))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRIMINAL_CRIME_HISTORY`
--

LOCK TABLES `CRIMINAL_CRIME_HISTORY` WRITE;
/*!40000 ALTER TABLE `CRIMINAL_CRIME_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRIMINAL_CRIME_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EVIDENCE`
--

DROP TABLE IF EXISTS `EVIDENCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EVIDENCE` (
  `evidence_id` int unsigned NOT NULL AUTO_INCREMENT,
  `crime_id` int unsigned NOT NULL,
  `evidence_type` enum('Physical','Documentary','Testimonial','Digital','Forensic','Other') DEFAULT NULL,
  `evidence_description` text,
  `collected_date` date NOT NULL,
  `collected_by` int unsigned NOT NULL,
  `storage_location` varchar(120) DEFAULT NULL,
  `collected_time` time NOT NULL,
  PRIMARY KEY (`evidence_id`),
  KEY `crime_id` (`crime_id`),
  KEY `collected_by` (`collected_by`),
  CONSTRAINT `EVIDENCE_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `CRIME` (`crime_id`),
  CONSTRAINT `EVIDENCE_ibfk_2` FOREIGN KEY (`collected_by`) REFERENCES `OFFICER` (`officer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EVIDENCE`
--

LOCK TABLES `EVIDENCE` WRITE;
/*!40000 ALTER TABLE `EVIDENCE` DISABLE KEYS */;
/*!40000 ALTER TABLE `EVIDENCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LOCATION`
--

DROP TABLE IF EXISTS `LOCATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LOCATION` (
  `location_id` int unsigned NOT NULL AUTO_INCREMENT,
  `address1` varchar(120) NOT NULL,
  `address2` varchar(120) DEFAULT NULL,
  `address3` varchar(120) DEFAULT NULL,
  `district` varchar(120) DEFAULT NULL,
  `city` varchar(120) NOT NULL,
  `state` varchar(120) NOT NULL,
  `pincode` varchar(15) NOT NULL,
  `country` varchar(100) NOT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `address1` (`address1`,`address2`,`address3`,`city`,`state`,`pincode`,`country`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOCATION`
--

LOCK TABLES `LOCATION` WRITE;
/*!40000 ALTER TABLE `LOCATION` DISABLE KEYS */;
/*!40000 ALTER TABLE `LOCATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OFFICER`
--

DROP TABLE IF EXISTS `OFFICER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OFFICER` (
  `officer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `officer_rank` int unsigned NOT NULL,
  `badge_number` varchar(20) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `department` text,
  `contact_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`officer_id`),
  UNIQUE KEY `badge_number` (`badge_number`),
  KEY `officer_rank` (`officer_rank`),
  CONSTRAINT `OFFICER_ibfk_1` FOREIGN KEY (`officer_rank`) REFERENCES `OFFICER_RANK` (`rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OFFICER`
--

LOCK TABLES `OFFICER` WRITE;
/*!40000 ALTER TABLE `OFFICER` DISABLE KEYS */;
/*!40000 ALTER TABLE `OFFICER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OFFICER_CRIME`
--

DROP TABLE IF EXISTS `OFFICER_CRIME`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OFFICER_CRIME` (
  `crime_id` int unsigned NOT NULL,
  `officer_id` int unsigned NOT NULL,
  `officer_role` enum('Arresting','Investigating','Reporting') NOT NULL DEFAULT 'Investigating',
  PRIMARY KEY (`crime_id`,`officer_id`),
  KEY `officer_id` (`officer_id`),
  CONSTRAINT `OFFICER_CRIME_ibfk_1` FOREIGN KEY (`crime_id`) REFERENCES `CRIME` (`crime_id`),
  CONSTRAINT `OFFICER_CRIME_ibfk_2` FOREIGN KEY (`officer_id`) REFERENCES `OFFICER` (`officer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OFFICER_CRIME`
--

LOCK TABLES `OFFICER_CRIME` WRITE;
/*!40000 ALTER TABLE `OFFICER_CRIME` DISABLE KEYS */;
/*!40000 ALTER TABLE `OFFICER_CRIME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OFFICER_RANK`
--

DROP TABLE IF EXISTS `OFFICER_RANK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OFFICER_RANK` (
  `rank_id` int unsigned NOT NULL AUTO_INCREMENT,
  `rank_name` varchar(30) NOT NULL,
  `access_level` tinyint unsigned NOT NULL,
  PRIMARY KEY (`rank_id`),
  CONSTRAINT `CHECK_ACCESS_LEVEL` CHECK ((`access_level` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OFFICER_RANK`
--

LOCK TABLES `OFFICER_RANK` WRITE;
/*!40000 ALTER TABLE `OFFICER_RANK` DISABLE KEYS */;
/*!40000 ALTER TABLE `OFFICER_RANK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUSPECT`
--

DROP TABLE IF EXISTS `SUSPECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SUSPECT` (
  `suspect_id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `address_id` int unsigned NOT NULL,
  `photo_url` text,
  `suspect_description` text,
  `status` enum('Under Investigation','Cleared','Arrested','Wanted') DEFAULT NULL,
  PRIMARY KEY (`suspect_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `SUSPECT_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `LOCATION` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUSPECT`
--

LOCK TABLES `SUSPECT` WRITE;
/*!40000 ALTER TABLE `SUSPECT` DISABLE KEYS */;
/*!40000 ALTER TABLE `SUSPECT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `officer_id` int unsigned DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(64) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_type` enum('Civilian','Officer','Admin') NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `officer_id` (`officer_id`),
  UNIQUE KEY `officer_id_2` (`officer_id`),
  CONSTRAINT `USER_ibfk_1` FOREIGN KEY (`officer_id`) REFERENCES `OFFICER` (`officer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER_REPORTED_CRIME`
--

DROP TABLE IF EXISTS `USER_REPORTED_CRIME`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER_REPORTED_CRIME` (
  `report_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `reported_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `report_status` enum('Pending','Reviewed','Accepted','Rejected','Under Investigation') NOT NULL DEFAULT 'Pending',
  `rejection_reason` text,
  `reviewed_by` int unsigned DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`report_id`),
  KEY `user_id` (`user_id`),
  KEY `reviewed_by` (`reviewed_by`),
  CONSTRAINT `USER_REPORTED_CRIME_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`),
  CONSTRAINT `USER_REPORTED_CRIME_ibfk_2` FOREIGN KEY (`reviewed_by`) REFERENCES `OFFICER` (`officer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER_REPORTED_CRIME`
--

LOCK TABLES `USER_REPORTED_CRIME` WRITE;
/*!40000 ALTER TABLE `USER_REPORTED_CRIME` DISABLE KEYS */;
/*!40000 ALTER TABLE `USER_REPORTED_CRIME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VICTIM`
--

DROP TABLE IF EXISTS `VICTIM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VICTIM` (
  `victim_id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `address_id` int unsigned NOT NULL,
  PRIMARY KEY (`victim_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `VICTIM_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `LOCATION` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VICTIM`
--

LOCK TABLES `VICTIM` WRITE;
/*!40000 ALTER TABLE `VICTIM` DISABLE KEYS */;
/*!40000 ALTER TABLE `VICTIM` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-18 18:11:11
