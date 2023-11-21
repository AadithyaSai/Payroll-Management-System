require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "payroll-management.caifrqvpkagx.ap-south-1.rds.amazonaws.com",
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "payroll",
});

const connectToMySQL = () => connection.connect();
const disconnectFromMySQL = () => connection.end();

// WARNING: Always ensure that connectToMySQL is called before executing a query,
//          and the connection is freed when the app closes

// Basic query example
// connection.query("SELECT * FROM company", function (error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results);
// });

function returnPromise(sql, ...args) {
  // Helper function to simplify the process of returning a promise for mysql results

  return Promise((resolve, reject) => {
    connection.query(sql, args, (err, result) => {
      if (err) throw err;

      resolve(result);
    });
  });
}

function login(username, password) {
  // TODO: Make schema for username and password first
}

function register(username, password) {
  // TODO: Make schema for username and password first
}

function getCompanies() {
  let sql = "SELECT * FROM companies";

  return returnPromise(sql);
}

function getCompanyDetails(companyId) {
  let sql =
    "SELECT * FROM companies, employee WHERE company.company_id=? AND employee.company=company_id";

  return returnPromise(sql, companyId);
}

function getEmployee(empId) {
  let sql = "SELECT  * FROM employee WHERE emp_no=?";

  return returnPromise(sql, empId);
}

function createCompany(companyName, companyAddress) {
  let sql = "INSERT INTO company(company_name, address) VALUES(?, ?)";

  return returnPromise(sql, companyName, companyAddress);
}

function createEmployee(
  empName,
  empAddr,
  phNo,
  email,
  company,
  baseSalary,
  allowancePercent,
  bonusPercent,
  insurancePercent
) {
  let sql = `
    INSERT INTO employee(emp_name, address, ph_no, email, company) VALUES(?, ?, ?, ?, ?);
    INSERT INTO salary VALUES (@@IDENTITY, ?, ?, ?, ?);
    `;

  return returnPromise(
    sql,
    empName,
    empAddr,
    phNo,
    email,
    company,
    baseSalary,
    allowancePercent,
    bonusPercent,
    insurancePercent
  );
}

function deleteEmployee(empId) {
  let sql = "DELETE FROM employee WHERE emp_id=?";

  returnPromise(sql, empId);
}

function deleteCompany(companyId) {
  let sql = "DELETE FROM company WHERE company_id=?";

  returnPromise(sql, companyId);
}
