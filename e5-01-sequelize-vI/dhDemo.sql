-- / Creación de la DB
CREATE DATABASE IF NOT EXISTS `dhDemo`;
USE `dhDemo`;

-- / Creación de las tablas que NO tienen FK
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `brands` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `colors` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- / Creación de las tablas que tienen FK
CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) NULL DEFAULT 'no-image.png',
  `userId` int(10) unsigned DEFAULT NULL,
  `brandId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categoryProduct` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `productId` int(10) unsigned DEFAULT NULL,
  `categoryId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `colorProduct` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `productId` int(10) unsigned DEFAULT NULL,
  `colorId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  FOREIGN KEY (`colorId`) REFERENCES `colors` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- / Populando las tablas
INSERT INTO `brands` (`name`)
VALUES 
	('Apple'),
	('Microsoft'),
	('Asus'),
	('BGH'),
	('Dell');

INSERT INTO `categories` (`name`) 
VALUES 
	('Desktop computers'),
	('Laptops'),
	('Tablets'),
	('Cellphones'),
	('Tv sets');

INSERT INTO `colors` (`name`)
VALUES 
	('yellow'),
	('blue'),
	('red'),
	('white'),
	('black');

INSERT INTO `users` (`firstName`, `lastName`, `email`, `password`) 
VALUES
	('Jon', 'Doe', 'jondoe@email.com', 'baNaNa'),
	('Jane', 'Doe', 'janedoe@email.com', 'baNaNa'),
	('Jon', 'Snow', 'jonsnow@email.com', 'baNaNa');
	
INSERT INTO `products` (`name`, `price`, `image`, `userId`, `brandId`)
VALUES
	('Tad Rohan',76.00,'https://lorempixel.com/640/480/?71050', 1, 3),
	('Javier Ryan',27756.00,'https://lorempixel.com/640/480/?31649', 1, 3),
	('Sister Halvorson',76802.00,'https://lorempixel.com/640/480/?24186', 1, 3),
	('Prof. Chauncey Gibson',66620.00,'https://lorempixel.com/640/480/?62539', 2, 1),
	('Mrs. Freda Herman',45799.00,'https://lorempixel.com/640/480/?21097', 2, 1),
	('Maud Parisian',13978.00,'https://lorempixel.com/640/480/?27199', 2, 1),
	('Jared Haley',67152.00,'https://lorempixel.com/640/480/?25100', 3, 2),
	('Vena Eichmann',50523.00,'https://lorempixel.com/640/480/?36870', 3, 2),
	('Luigi Feeney',35869.00,'https://lorempixel.com/640/480/?95950', 3, 2),
	('Granville Gutkowski',35531.00,'https://lorempixel.com/640/480/?65288', 1, 1),
	('Thad Wehner',29386.00,'https://lorempixel.com/640/480/?93439', 1, 1),
	('Dexter Gislason',46872.00,'https://lorempixel.com/640/480/?95068', 1, 1),
	('Winona Kub PhD',60849.00,'https://lorempixel.com/640/480/?34178', 2, 2),
	('Randall Parisian',42437.00,'https://lorempixel.com/640/480/?96252', 2, 2),
	('Ora Schiller',67604.00,'https://lorempixel.com/640/480/?84661', 2, 2),
	('Lindsey Mueller',57055.00,'https://lorempixel.com/640/480/?22748', 3, 4),
	('Imogene Padberg',1680.00,'https://lorempixel.com/640/480/?19258', 3, 4),
	('Ms. Earline Nicolas IV',44917.00,'https://lorempixel.com/640/480/?66185', 3, 4),
	('Mr. Joe Marvin',5084.00,'https://lorempixel.com/640/480/?18558', 1, 5),
	('Liza Streich',86031.00,'https://lorempixel.com/640/480/?25210', 1, 5);