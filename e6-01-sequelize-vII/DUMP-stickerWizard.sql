-- / Creación de la DB
CREATE DATABASE IF NOT EXISTS `stickerWizard`;
USE `stickerWizard`;

-- / Creación de las tablas que NO tienen FK
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `brands` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `colors` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- / Creación de las tablas que tienen FK
CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) NULL DEFAULT '404.png',
  `keywords` text NULL DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `brandId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categoryProduct` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `productId` int(10) unsigned DEFAULT NULL,
  `categoryId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `colorProduct` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `productId` int(10) unsigned DEFAULT NULL,
  `colorId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
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

INSERT INTO `products` (`name`, `description`, `price`, `keywords`, `userId`, `brandId`, `image`)
VALUES
  ('CARBON DIOXIDE', 'whiteboard intuitive supply-chains', '281386.78', 'sit amet nunc viverra', 2, 2, 'product_1.png'),
  ('NITROGEN', 'deliver back-end methodologies', '501806.62', 'tincidunt eget tempus vel pede morbi', 3, 5, 'product_2.png'),
  ('zinc oxide and dimethicone', 'monetize 24/365 markets', '309906.14', 'ut mauris eget', 1, 4, 'product_1.png'),
  ('calcium carbonate', 'iterate killer interfaces', '226892.46', 'sodales scelerisque mauris sit amet eros', 3, 1, 'product_2.png'),
  ('Hyoscyamine Sulfate', 'whiteboard dot-com infomediaries', '247946.49', 'convallis eget eleifend luctus ultricies', 3, 1, 'product_1.png'),
  ('Avobenzone, Octinoxate, Octisalate, Octocrylene', 'monetize customized vortals', '685395.17', 'dolor sit amet', 3, 1, 'product_2.png'),
  ('dalteparin sodium', 'grow cross-platform bandwidth', '703178.82', 'id lobortis convallis', 1, 4, 'product_1.png'),
  ('Glipizide and Metformin Hydrochloride', 'expedite web-enabled deliverables', '448279.01', 'dapibus augue vel accumsan', 1, 5, 'product_2.png'),
  ('Docusate sodium', 'strategize transparent niches', '360830.91', 'praesent lectus vestibulum quam sapien varius', 3, 1, 'product_1.png'),
  ('quercus macrocarpa pollen', 'maximize magnetic content', '604335.74', 'non pretium quis lectus suspendisse potenti', 1, 3, 'product_2.png'),
  ('Salicylic Acid', 'optimize best-of-breed schemas', '594116.01', 'at turpis donec', 3, 3, 'product_1.png'),
  ('docusate calcium', 'harness visionary partnerships', '220104.26', 'ridiculus mus vivamus vestibulum', 3, 1, 'product_2.png'),
  ('carvedilol', 'incentivize seamless interfaces', '225185.45', 'aliquet maecenas leo', 2, 5, 'product_1.png'),
  ('oxybutynin chloride', 'optimize e-business e-business', '935033.04', 'semper rutrum nulla nunc purus phasellus', 3, 5, 'product_2.png'),
  ('Titanium Dioxide', 'extend dynamic partnerships', '972750.87', 'aliquet maecenas leo', 2, 2, 'product_1.png'),
  ('Octinoxate and Titanium Dioxide', 'exploit transparent users', '278575.24', 'interdum mauris ullamcorper', 2, 4, 'product_2.png'),
  ('Common Sagebrush', 'revolutionize collaborative e-business', '887522.97', 'sit amet justo morbi', 1, 1, 'product_1.png'),
  ('Amoxicillin', 'evolve magnetic paradigms', '531219.88', 'praesent id massa id nisl', 2, 1, 'product_2.png'),
  ('Cetirizine HCl', 'streamline synergistic e-business', '617194.05', 'luctus et ultrices posuere', 1, 4, 'product_1.png'),
  ('ASCORBIC ACID, THIAMINE MONONITRATE,RIBOFLAVIN, NIACINAMIDE, PYRIDOXINE HYDROCHLORIDE, FOLIC ACID, CYANOCOBALAMIN, BIOTIN, CALCIUM PANTOTHENATE,', 'reintermediate visionary schemas', '251911.02', 'proin interdum mauris', 1, 1, 'product_2.png'),
  ('Salicylic Acid', 'grow holistic technologies', '419938.65', 'morbi a ipsum integer a', 2, 1, 'product_1.png'),
  ('Diphenhydramine HCl', 'implement scalable technologies', '882518.05', 'pellentesque at nulla suspendisse potenti', 1, 5, 'product_2.png'),
  ('DIDANOSINE', 'mesh 24/7 applications', '76498.60', 'massa id nisl venenatis', 2, 5, 'product_1.png'),
  ('CAUSTICUM', 'utilize back-end platforms', '45744.47', 'sagittis dui vel nisl duis ac', 1, 1, 'product_2.png'),
  ('Gabapentin', 'implement sexy experiences', '944635.81', 'varius nulla facilisi cras non velit', 3, 2, 'product_1.png'),
  ('Trandolapril', 'leverage open-source communities', '526855.64', 'elementum pellentesque quisque porta', 2, 1, 'product_2.png'),
  ('Ketorolac Tromethamine', 'empower dynamic e-business', '494648.04', 'purus eu magna vulputate', 3, 5, 'product_1.png'),
  ('Amlodipine Besylate', 'harness next-generation initiatives', '433461.67', 'platea dictumst maecenas ut', 2, 4, 'product_2.png'),
  ('SODIUM CHLORIDE', 'expedite world-class mindshare', '526994.58', 'quis turpis sed ante', 3, 1, 'product_1.png'),
  ('emtricitabine and tenofovir disoproxil fumarate', 'orchestrate end-to-end experiences', '466741.91', 'elit sodales scelerisque', 3, 2, 'product_2.png');
