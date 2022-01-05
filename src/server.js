const express = require("express");
const PORT = process.env.PORT || 7000;
const path = require("path");
const app = new express();
const contr = require("./controller/router.js");
const ejs = require("ejs");

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.get("/favicon.ico", (req, res) => res.end(""));
app.get("/:route", (req, res) => res.render(req.params.route));

app.listen(PORT, () => console.log("RUN server http://localhost:" + PORT));
