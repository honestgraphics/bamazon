DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL (10, 2) NOT NULL,
    stock_quantity INTEGER (250) NOT NULL,
    product_sales DECIMAL (10, 2) NOT NULL,
    PRIMARY KEY(item_id)
);

CREATE TABLE departments (
	department_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL (10, 2) NOT NULL,
    PRIMARY KEY(department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) 
VALUES ("Almond Breeze Almond Milk, Unsweetened, 32 OZ", "Dairy", 1.99, 58, 123.38), 
("TERRA Mediterranean Chips, 6.8 oz.", "Snacks", 2.89, 200,3505.57),
("Barilla Pasta Sauce Variety Pack, 24 Ounce, 4 Jars", "Pasta", 8.54, 3,3851.54),
("Raw Wraps Spinach Soft Taco", "International", 7.99, 621, 2508.86),
("Quaker Instant Oatmeal, Variety Value Pack, Breakfast Cereal, 18 Packets", "Breakfast", 4.88, 461, 2542.48),
("Legal Sea Foods Raw in the Shell Lobster Tails, 2 Count", "Seafood", 38.53, 47, 81067.12),
("Navel Oranges from Organic Mountain", "Produce", 19.98, 63, 408),
("Q-tips Cotton Swabs, 375 ct", "Health & Beauty", 268, 264, 42757.20),
("Neutrogena Oil-Free Liquid Eye Makeup Remover, 3.8 Fl. Oz.", "Grocery", 4.97, 62, 1008.91),
("Purina Fancy Feast Classic Feast Wet Cat Food - (24) 3 oz. Cans", "Pets", 14.16, 21, 11554.56);



INSERT INTO departments (department_name, over_head_costs) 
VALUES ("Dairy", 428.97), ("Snacks", 1562.03), ("Pasta", 1742.08), ("International", 15.72), ("Breakfast", 16.21), ("Seafood", 19075.85), ("Produce", 1526.10), ("Health & Beauty", 158.24), ("Grocery", 15.47), ("Pets", 1235.38);