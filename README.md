# bamazon
## Node.js & MySQL

## Overview

In this activity, I created an Amazon-like storefront with the MySQL skills I learned. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, I programmed the app to track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

Make sure you save and require the MySQL and Inquirer npm packages if you download this--your app will need them for data input and storage.

### Part 1: Customer View

This part of the project let's the customer operate within the bamazon store.

1. Includes a MySQL Database called `bamazon` with a Table inside of that database called `products`.

2. The products table has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

3. This database is prepopulated with around 10 different products. (i.e. Inserted "mock" data rows into this database and table).

4. There is a node application with this part of the assignment called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

5. The app then prompts users with two messages.

   * The first message asks users what is the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

6. Once the customer has placed the order, the application checks if your store has enough of the product to meet the customer's request.

   * If not, the app logs a phrase like `Insufficient quantity!`, and then prevent the order from going through.

7. However, if the store _does_ have enough of the product, it will fulfill the customer's order.
   * This means the app will update the SQL database to reflect the remaining quantity.
   * Once the update goes through, the app will then show the customer the total cost of their purchase.

- - -
- - -


### Part 2: Manager View

This part of the project lets the manager operate within the bamazon store.

* Created a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then the app lists all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store.

- - -
- - -
 


### Part 3: Supervisor View

This part of the project lets Supervisors operate within the store.

1. Creates a new table within the MYSQL database `bamazon` called `departments`. The table includes the following columns:

   * department_id
   * department_name
   * over_head_costs (A dummy number you set for each department)

2. Modifications were made to help the supervisor part work right. 

   * The products table was modified so that there's a product_sales column
   * `bamazonCustomer.js` app was modified so that product_sales value would be updated with each individual products total revenue from each sale.
   * `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.


3. Creates another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app will display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |




============
5. The `total_profit` column will be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.
==========================


## Additional Comments

* In lieu of screenshots for this assignment, I am including an instructional video. The link for that video is:
(https://guides.github.com/features/mastering-markdown/)














Additional help for READMEs:
- - -
* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

- - -
