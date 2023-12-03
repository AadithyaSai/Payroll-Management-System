const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require("cors");
const Query = require("./queries");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname));

app.use(cors());
app.options("*", cors()); // enable pre-flight

const query = new Query();

app.get("/", function (req, res) {
  res.send({ content: "Test" });
});

app.get("/login", function (req, res) {
  res.send({ content: "Login Data - Fail or Success. Use basicAuth" });
});

app.get("/company", function (req, res) {
  query
    .getCompanies()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

app.get("/company/:companyid", function (req, res) {
  let companyId = req.params.companyid;

  query
    .getCompanyDetails(companyId)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

app.get("/employee/:empid", function (req, res) {
  let empId = req.params.empid;

  query
    .getEmployee(empId)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

app.post("/register", function (req, res) {
  res.send({ content: "Register user - Fail or Success. Use basicAuth" });
});

app.post("/company", function (req, res) {
  let companyName = req.query.companyName;
  let companyAddress = req.query.companyAddress;

  query
    .createCompany(companyName, companyAddress)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

app.post("/employee", function (req, res) {
  let empName = req.query.empName;
  let empAddr = req.query.empAddr;
  let phNo = req.query.phNo;
  let email = req.query.email;
  let company = req.query.company;

  let baseSalary = req.query.baseSalary;
  let allowancePercent = req.query.allowancePercent;
  let bonusPercent = req.query.bonusPercent;
  let insurancePercent = req.query.insurancePercent;

  query
    .createEmployee(
      empName,
      empAddr,
      phNo,
      email,
      company,
      baseSalary,
      allowancePercent,
      bonusPercent,
      insurancePercent
    )
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

app.delete("/employee/:empid", function (req, res) {
  let empId = req.params.empid;

  query
    .deleteEmployee(empId)
    .then((result) => {
      if (result[0].affectedRows != 0) res.sendStatus(200);
      else
        res
          .status(500)
          .send({ message: `No such employee by id ${companyId}` });
    })
    .catch((err) => res.status(500).send(err));
});

app.delete("/company/:companyid", function (req, res) {
  let companyId = req.params.companyid;

  query
    .deleteCompany(companyId)
    .then((result) => {
      if (result.affectedRows != 0) res.sendStatus(200);
      else
        res.status(500).send({ message: `No such company by id ${companyId}` });
    })
    .catch((err) => res.status(500).send(err));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
