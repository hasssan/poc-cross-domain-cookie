import express from "express";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";

const ENV = "dev";

const app = express();
const port = 3000; // Set the desired port number
const cookieName = "cors-cookie";

// Configure Nunjucks as the template engine
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Set the 'views' directory for Express to use
app.set("views", "views");

app.use(cookieParser());
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
  console.log(req.cookies);
  const message = req?.cookies[cookieName] ?? "no message from the cookie";
  res.render("index.html", { message });
});

app.post("/setcookie", (req, res) => {
  const cookieContent = req?.body?.cookieContent;
  const options = {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  };
  if (ENV === "prod") {
    options.secure = true;
    options.sameSite = "none";
  }
  const domain = req.get("host");
  if (domain.includes("hassan.web.id")) {
    options.domain = ".hassan.web.id";
  }
  if (domain.includes("hasssan.com")) {
    options.domain = ".hasssan.com";
  }
  res.cookie(cookieName, cookieContent, options);
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
