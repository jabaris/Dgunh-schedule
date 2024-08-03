-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0+deb9u2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `id` tinyint(4) DEFAULT NULL,
  `term_id` tinyint(4) DEFAULT NULL,
  `teacher_id` smallint(6) DEFAULT NULL,
  `class_room_id` tinyint(4) DEFAULT NULL,
  `lesson_type` tinyint(4) DEFAULT NULL,
  `date_start` varchar(10) DEFAULT NULL,
  `date_end` varchar(10) DEFAULT NULL,
  `week` tinyint(4) DEFAULT NULL,
  `weekday` tinyint(4) DEFAULT NULL,
  `lesson_num` tinyint(4) DEFAULT NULL,
  `lesson_title` varchar(43) DEFAULT NULL,
  `reference` varchar(0) DEFAULT NULL,
  `education_group_id` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (5,2,372,3,1,'2024-02-05','2024-05-23',1,0,3,'Исламские финансы','',1),(6,2,372,3,1,'2024-02-05','2024-05-23',2,0,3,'Исламские финансы','',1),(7,2,18,1,1,'2024-02-05','2024-05-23',1,1,1,'Системы искусственного интеллекта','',1),(8,2,18,1,1,'2024-02-05','2024-05-23',2,1,1,'Системы искусственного интеллекта','',1),(9,2,408,1,1,'2024-02-05','2024-05-23',1,1,2,'Экономика предприятия','',1),(10,2,408,1,1,'2024-02-05','2024-05-23',2,1,2,'Экономика предприятия','',1),(11,2,408,1,2,'2024-02-05','2024-05-23',1,1,3,'Экономика предприятия','',1),(12,2,18,1,2,'2024-02-05','2024-05-23',1,2,1,'Системы искусственного интеллекта','',1),(13,2,5,2,2,'2024-02-05','2024-05-23',2,2,3,'Разработка программных приложений','',1),(14,2,5,2,3,'2024-02-05','2024-05-23',2,2,2,'Разработка программных приложений','',1),(15,2,5,2,3,'2024-02-05','2024-05-23',1,2,3,'Разработка программных приложений','',1),(16,2,5,2,1,'2024-02-05','2024-05-23',1,2,2,'Разработка программных приложений','',1),(17,2,5,2,1,'2024-02-05','2024-05-23',2,2,1,'Разработка программных приложений','',1),(18,2,11,5,3,'2024-02-05','2024-05-23',1,3,1,'Проектный практикум','',1),(19,2,11,5,3,'2024-02-05','2024-05-23',2,3,1,'Проектный практикум','',1),(20,2,11,5,2,'2024-02-05','2024-05-23',1,3,2,'Проектный практикум','',1),(21,2,11,5,2,'2024-02-05','2024-05-23',2,3,2,'Проектный практикум','',1),(22,2,18,4,3,'2024-02-05','2024-05-23',1,4,1,'Системы искусственного интеллекта','',1),(23,2,18,4,3,'2024-02-05','2024-05-23',2,4,1,'Системы искусственного интеллекта','',1),(26,2,219,1,1,'2024-02-05','2024-05-23',1,5,1,'Системная архитектура информационных систем','',1),(27,2,219,1,1,'2024-02-05','2024-05-23',2,5,1,'Системная архитектура информационных систем','',1),(28,2,219,4,2,'2024-02-05','2024-05-23',1,5,2,'Системная архитектура информационных систем','',1),(29,2,219,4,2,'2024-02-05','2024-05-23',2,5,2,'Системная архитектура информационных систем','',1),(3,2,474,2,2,'2024-02-05','2024-05-23',1,0,2,'Информационная безопасность','',1),(24,2,337,1,2,'2024-02-05','2024-05-23',1,4,2,'Физическая культура и спорт','',1),(1,2,474,1,1,'2024-02-05','2024-05-23',1,0,1,'Информационная безопасность','',1),(25,2,337,1,2,'2024-02-05','2024-05-23',2,4,2,'Физическая культура и спорт','',1),(2,2,474,1,1,'2024-02-05','2024-05-23',2,0,1,'Информационная безопасность','',1),(4,2,474,2,3,'2024-02-05','2024-05-23',2,0,2,'Информационная безопасность','',1);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-30 16:42:40
