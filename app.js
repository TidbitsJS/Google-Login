const express = require("express");
const app = express();

app.set("view-engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(3000, () => {
  console.log("App now listening for requests on port 3000");
});
