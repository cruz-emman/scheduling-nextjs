CREATE DATABASE  IF NOT EXISTS `scheduling` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `scheduling`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: scheduling
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appoinmentschedule`
--

DROP TABLE IF EXISTS `appoinmentschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appoinmentschedule` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactPerson` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateOfEvent` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startingTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endingTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purpose` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doesHaveDryRun` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dryRunDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dryRunStart` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dryRunEnd` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doesHaveTCETAssitance` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tcetOtherAssitance` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meetingTypeOption` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meetingTypeServices` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meetingTypeServiceLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cameraSetup` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `status` enum('PENDING','SUCCESS') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appoinmentschedule`
--

LOCK TABLES `appoinmentschedule` WRITE;
/*!40000 ALTER TABLE `appoinmentschedule` DISABLE KEYS */;
INSERT INTO `appoinmentschedule` VALUES ('clw4j88l2000ao97kucyqpnev','updated ID','test1@gmail.com','test1','test1','test1','5/14/2024','10:00 AM','10:30 AM','meeting','no','','','','tcet','','meeting','meeting_waiting,meeting_breakout','','','2024-05-13 05:37:22.550','2024-05-15 01:42:57.900','PENDING');
/*!40000 ALTER TABLE `appoinmentschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('ADMIN','USER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('clvkdnszb000037eevtdt6t54','test','$2a$10$J9DW7lO.smuqp6uTiMk7jealMKG6vjMuSPiymGnmgKoPlD6v/ASgm','USER','test@gmail.com'),('clvkdvel4000137ee5e5t6ke7','test1','$2a$10$/i.2U30NAoUrHWd9kX3FQ.9WamjLCoNZ18osHw.wK9cla23Qiqa3y','USER','test1@gmail.com'),('clvkehznb000237eejtcxyze2','test2','$2a$10$IJjnfl.7PYhiHMwnxttVLe0qW.uAdammDwRWsiQr0lvFkrwA4GDkO','USER','test2@gmail.com'),('clvkes2et000337eev9e5u8ip','test3','$2a$10$UsyqfFmJOU9XjwisGVXlXepYzbbWt20c3WyyVk2HSfh9mO9dbgdBS','USER','test3@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-15 10:40:25
