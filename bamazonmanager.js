var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  inquirer.prompt([{
    type: "list",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    message: "Select one of the following options:",
    name: "makeChoice"
  }]).then(function (answer) {
      console.log(answer.makeChoice);
      if (answer.makeChoice === "View Products for Sale") {
        connection.query("SELECT * FROM products", function (err, res) {
          if (err) throw err;
          res.forEach(function (item) {
            console.log(item.item_id + ": " + item.product_name + "  -  $" + item.price);
          });
          process.exit();
        });
      }
      if (answer.makeChoice === "View Low Inventory") {
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
          if (err) throw err;
          res.forEach(function (item) {
            console.log(item.item_id + ": " + item.product_name + "  -  $" + item.price);
          });
          process.exit();
        });
      }
      if (answer.makeChoice === "Add to Inventory") {
        connection.query("SELECT * FROM products", function (err, res) {
          if (err) throw err;
          var ids = [];
          res.forEach(function (item) {
            console.log(item.item_id + ": " + item.product_name + "  -  $" + item.price);
            ids.push(item.item_id);
          });
          inquirer.prompt([{
            type: "input",
            message: "Choose an item to add inventory to.",
            // choices: ids,
            name: "makeChoice"
          }]).then(function (answer) {
            // console.log(answer.makeChoice);
            var item_id = answer.makeChoice;
            inquirer.prompt([{
              type: "input",
              message: "How many units would you like to add?",
              // choices: ids,
              name: "makeChoice"
            }]).then(function (answer) {
              var quantity = +answer.makeChoice;
              //loop through res.. each iteration will be object, loook for item id, and check quantity
              for (var i = 0; i < res.length; i++) {
                if (res[i].item_id == item_id) {
                  break;
                }
              }
              if (i == res.length) {
                console.log("Item not found.");
              } else {
                var newQuantity = +res[i].stock_quantity + quantity;
                connection.query("UPDATE products SET stock_quantity =" + newQuantity + " WHERE item_id =" + res[i].item_id, function (err, res) {
                  if (err) throw err;
                  console.log("Your new quantity for this inventory is " + newQuantity);
                  process.exit();
                });
              }
            })
          });
        });
      }
      if (answer.makeChoice === "Add New Product") {
        inquirer.prompt([{
            type: "input",
            message: "Product Name:",
            name: "productName"
          },
          {
            type: "input",
            message: "Department Name:",
            name: "departmentName"
          },
          {
            type: "input",
            message: "Price:",
            name: "price"
          },
          {
            type: "input",
            message: "Stock Quantity:",
            name: "stockQuantity"
          },
        ]).then(function (answer) {
            connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('" + answer.productName + "', '" + answer.departmentName + "', '" + answer.price + "', '" + answer.stockQuantity + "')", function (err, res) {
              if (err) throw err;
              console.log("Your item was added successfully.");
            });
          });
      
      }
    });
    // connection.query("SELECT * FROM products", function(err, res) {
    //   if (err) throw err;
    //   // console.log(res);
    //   // connection.end();
    //   // var ids = [];
    //   res.forEach(function(item){
    //     console.log(item.item_id + ": " + item.product_name + "  -  $" + item.price);
    //     // ids.push(item.item_id);
    //   });
    //   inquirer.prompt([
    //     {
    //       type: "input",
    //       message: "Choose an item to buy.",
    //       // choices: ids,
    //       name: "makeChoice"
    //     }
    //   ]).then(function(answer){
    //     // console.log(answer.makeChoice);
    //     var item_id = answer.makeChoice;
    //     inquirer.prompt([
    //       {
    //         type: "input",
    //         message: "How many units would you like?",
    //         // choices: ids,
    //         name: "makeChoice"
    //       }
    //     ]).then(function(answer){
    //       var quantity = answer.makeChoice;
    //       //loop through res.. each iteration will be object, loook for item id, and check quantity
    //       for (var i = 0; i < res.length; i++) { 
    //         if (res[i].item_id == item_id) {
    //           break;
    //         } 
    //       }
    //       if (i == res.length) {
    //         console.log("Item not found.");
    //       } else {
    //         if (res[i].stock_quantity < quantity) {
    //           console.log("Not enough items in stock.");
    //         } else {
    //           var costs = res[i].price*quantity;
    //           var newQuantity = res[i].stock_quantity-quantity;
    //           connection.query("UPDATE products SET stock_quantity =" + newQuantity + " WHERE item_id =" + res[i].item_id, function(err, res) {
    //             if (err) throw err;
    //             console.log("Your total cost is $" + costs);
    //             process.exit();
    //           }); 
    //         }
    //       }
    //     })
    //   });
    // });
  };