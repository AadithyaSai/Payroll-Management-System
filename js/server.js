const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname));

app.use(cors());
app.options("*", cors()); // enable pre-flight

app.get("/", function (req, res) {
  res.send({ content: "Test" });
});

app.get("/login", function (req, res) {
  res.send({ content: "Login Data - Fail or Success. Use basicAuth" });
});

app.get("/company", function (req, res) {
  res.send({ content: "List of companies" });
});

app.get("/company/:companyid", function (req, res) {
  let companyId = req.params.companyid;

  res.send({
    content: `deets of company ${companyId} and basic deets of its employees`,
  });
});

app.get("/employee/:empid", function (req, res) {
  let empId = req.params.empid;

  res.send({
    content: `deets of employee ${empId} and salary splitup`,
  });
});

app.post("/register", function (req, res) {
  res.send({ content: "Register user - Fail or Success. Use basicAuth" });
});

app.post("/company", function (req, res) {
  let companyName = req.query.companyName;
  let companyAddress = req.query.companyAddress;

  res.send({
    content: `Create company with ${companyName} and ${companyAddress}`,
  });
});

app.post("/employee", function (req, res) {
  let empName = req.query.empName;
  let empAddr = req.query.empAddr;
  let phNo = req.query.phNo;
  let email = req.query.email;
  let company = req.query.company;

  res.send({
    content: `Create employee with ${empName}, ${empAddr}, ${phNo}, ${email} and ${company}`,
  });
});

app.delete("/employee:empid", function (req, res) {
  let empId = req.params.empid;

  res.send({ content: `Delete employee with id ${empId}` });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
