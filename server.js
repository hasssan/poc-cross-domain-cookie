import express from "express";
import nunjucks from "nunjucks";

const app = express();
const port = 3000; // Set the desired port number

// Configure Nunjucks as the template engine
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Set the 'views' directory for Express to use
app.set("views", "views");

// Set the view engine to use Nunjucks
app.set("view engine", "nunjucks");

// Define a route
app.get("/", (req, res) => {
  res.render("index.html", { message: "Hello, Express with Nunjucks!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
