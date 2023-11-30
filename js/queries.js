require("dotenv").config();
const mysql = require("mysql");

class Query {
  constructor() {
    this.connection = mysql.createConnection({
      host: "payroll-management.caifrqvpkagx.ap-south-1.rds.amazonaws.com",
      port: 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: "payroll",
      multipleStatements: true,
    });
  }

  returnPromise(sql, ...args) {
    // Helper to simplify the process of returning a promise for mysql results

    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, result) => {
        if (err) {
          console.log(err);
          return {};
        }

        resolve(result);
      });
    });
  }

  login(username, password) {
    // TODO: Make schema for username and password first
  }

  register(username, password) {
    // TODO: Make schema for username and password first
  }

  getCompanies() {
    let sql = "SELECT * FROM company";

    return this.returnPromise(sql);
  }

  getCompanyDetails(companyId) {
    let sql =
      "SELECT * FROM company, employee WHERE company.company_id=? AND employee.company_id=company.company_id";

    return this.returnPromise(sql, companyId);
  }

  getEmployee(empId) {
    let sql =
      "SELECT * FROM employee, salary WHERE salary.emp_id=employee.emp_id AND employee.emp_id=?";

    return this.returnPromise(sql, empId);
  }

  createCompany(companyName, companyAddress) {
    let sql = "INSERT INTO company(company_name, address) VALUES(?, ?)";

    return this.returnPromise(sql, companyName, companyAddress);
  }

  createEmployee(
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
      INSERT INTO employee(emp_name, address, ph_no, email, company_id) VALUES(?, ?, ?, ?, ?);
      INSERT INTO salary VALUES (@@IDENTITY, ?, ?, ?, ?);
      `;

    return this.returnPromise(
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

  deleteEmployee(empId) {
    let sql = "DELETE FROM employee WHERE emp_id=?";

    return this.returnPromise(sql, empId);
  }

  deleteCompany(companyId) {
    let sql = "DELETE FROM company WHERE company_id=?";

    return this.returnPromise(sql, companyId);
  }
}

module.exports = Query;
