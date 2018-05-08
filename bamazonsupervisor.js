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
  inquirer.prompt([
    {
      type: "list", 
      choices: ["View Product Sales By Department", "Create New Department"],message: "What would you like to do?",
      name: "makeChoice"
    }
  ]).then(function(answer){
    console.log(answer.makeChoice);
    if (answer.makeChoice === "View Product Sales By Department") {
      connection.query("SELECT departments.department_id, departments.department_name, products.product_sales, departments.over_head_costs FROM products RIGHT JOIN departments ON departments.department_name = products.department_name", function (err, res) {
        if (err) throw err;
        console.log("department_id\tdepartment_name\tover_head_costs\tproduct_sales\ttotal_profit")
        res.forEach(function (item) {
          //department tab
          var departmentTab = "\t";
          if (item.department_name.length < 8) {
            departmentTab += "\t";
          }
          //overhead tab
          var overHeadTab = "\t\t";
          if (item.over_head_costs.length < 8) {
            overHeadTab += "\t";
          }
          if (item.department_id === 6) {overHeadTab = "\t"}
          //productsales tab
          var prodSalesTab = "\t\t";
          if (item.product_sales.length < 8) {
            prodSalesTab += "\t";
          }
          if (item.department_id === 6) {prodSalesTab = "\t"}
          if (item.department_id === 10) {prodSalesTab = "\t"}
          //print table
          console.log(item.department_id +"\t\t"+ item.department_name + departmentTab + item.over_head_costs + overHeadTab + item.product_sales + prodSalesTab + (item.product_sales-item.over_head_costs));
        });
        // total profit
        process.exit();
      });
    }
    if (answer.makeChoice === "Create New Department") {
      inquirer.prompt([
        {
          type: "input",
          message: "Department Name:",
          name: "departmentName"
        },
        {
          type: "input",
          message: "Overhead Costs:",
          name: "overHeadCosts"
        }
      ]).then(function (answer) {
        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES('" + answer.departmentName + "', '" + answer.overHeadCosts + "')", function (err, res) {
          if (err) throw err;
          console.log("Your new department has been added successfully!");
          process.exit();
        });
      });
      
        
      //   res.forEach(function (item) {
      //     console.log(item.item_id + ": " + item.product_name + "  -  $" + item.price);
      //   });
        
    
    }
    });
}
