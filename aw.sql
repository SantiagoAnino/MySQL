-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.28-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para aw2
CREATE DATABASE IF NOT EXISTS `aw2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `aw2`;

-- Volcando estructura para tabla aw2.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL,
  `purchase_price` float DEFAULT NULL,
  `selling_price` float DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla aw2.items: ~10 rows (aproximadamente)
INSERT INTO `items` (`id`, `name`, `desc`, `purchase_price`, `selling_price`, `category`) VALUES
	(1, 'Laptop', 'Asus ROG I9', 920, 150.99, 'Electronics'),
	(2, 'Headphones', 'High-quality noise-canceling headphones', 100, 150, 'Electronics'),
	(3, 'Desk Chair', 'Comfortable ergonomic desk chair', 120, 180, 'Furniture'),
	(4, 'Smartphone', 'Latest model with advanced features', 500, 700, 'Electronics'),
	(5, 'Coffee Maker', 'Programmable coffee maker for home', 50, 80, 'Appliances'),
	(6, 'Running Shoes', 'High-performance running shoes', 60, 90, 'Clothing'),
	(7, 'Digital Camera', 'Professional-grade digital camera', 800, 1100, 'Electronics'),
	(8, 'Cookware Set', 'Non-stick cookware set for the kitchen', 100, 150, 'Kitchen'),
	(9, 'Backpack', 'Durable and stylish backpack for everyday use', 30, 50, 'Accessories'),
	(10, 'Gaming Console', 'Popular gaming console with cutting-edge graphics', 300, 400, 'Electronics');

-- Volcando estructura para tabla aw2.sales
CREATE TABLE IF NOT EXISTS `sales` (
  `id` varchar(50) NOT NULL DEFAULT '',
  `item` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `date` date DEFAULT curdate(),
  `seller` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__users` (`seller`),
  KEY `FK_sales_items` (`item`),
  CONSTRAINT `FK__users` FOREIGN KEY (`seller`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_sales_items` FOREIGN KEY (`item`) REFERENCES `items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla aw2.sales: ~1 rows (aproximadamente)
INSERT INTO `sales` (`id`, `item`, `total`, `date`, `seller`) VALUES
	('2023112703272856612', 1, 500, '2023-11-27', 2);

-- Volcando estructura para tabla aw2.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla aw2.users: ~11 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `lastname`, `username`, `pass`) VALUES
	(1, 'John', 'Doe', 'Jdoe', '123'),
	(2, 'Olivia', 'Martinez', 'Omartinez', '1234'),
	(3, 'Bob', 'Johnson', 'Bjohnson', 'bob789'),
	(4, 'Alice', 'Brown', 'Abrown', 'alice456'),
	(5, 'Charlie', 'Davis', 'Cdavis', 'charlie159'),
	(6, 'Emma', 'Taylor', 'Etaylor', 'emma248'),
	(7, 'Jane', 'Smith', 'Jsmith', 'jane751'),
	(8, 'William', 'Thomas', 'Wthomas', 'william554'),
	(9, 'Ava', 'White', 'Awhite', 'ava598'),
	(10, 'Liam', 'Evans', 'Levans', 'evans384'),
	(11, 'Santiago', 'Anino', 'SantiagoAnino', 'Santiago832');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
