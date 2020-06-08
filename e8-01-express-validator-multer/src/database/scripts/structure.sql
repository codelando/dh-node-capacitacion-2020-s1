-- Creamos la base de datos
create database sticker_wizard charset utf8mb4 collate utf8mb4_unicode_ci;
use sticker_wizard;

-- Tabla de usuarios
create table users (
	id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
    image VARCHAR(100) NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    category_id INT(11) NOT NULL DEFAULT 1,
    PRIMARY KEY (id) 
);

-- Tabla de categorías de usuarios
create table categories (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- Agregamos la relación con las temáticas
ALTER TABLE users ADD CONSTRAINT fk_user_category FOREIGN KEY (category_id) REFERENCES categories(id);

-- Tabla de tokens
create table tokens (
	id INT(11) NOT NULL AUTO_INCREMENT,
    token VARCHAR(100) NOT NULL,
	user_id INT(11),
    PRIMARY KEY (id)
);

-- Agregamos la relación con los usuarios
ALTER TABLE tokens ADD CONSTRAINT fk_token_user FOREIGN KEY (user_id) REFERENCES users(id);

-- Tabla de productos
create table products (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
	description TEXT NULL,
    image VARCHAR(100) NULL,
    price DECIMAL(8,2) NULL DEFAULT 0,
    thematic_id INT(11),
    PRIMARY KEY (id) 
);

-- Tabla de tematicas de productos
create table thematics (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- Agregamos la relación con los usuarios
ALTER TABLE products ADD CONSTRAINT fk_product_thematic FOREIGN KEY (thematic_id) REFERENCES thematics(id);

-- Tabla de tags de productos
create table products_tags (
	product_id INT(11) NOT NULL,
	tag_id INT(11) NOT NULL,
    PRIMARY KEY (product_id, tag_id)
);

-- Tabla de tags
create table tags (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- Agregamos la relación con los productos y tags
ALTER TABLE products_tags ADD CONSTRAINT fk_products_tags_product FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE products_tags ADD CONSTRAINT fk_products_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id);