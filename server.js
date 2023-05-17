import express from "express";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import cors from "cors";

const ENV = "dev";

const app = express();
const port = 3000; // Set the desired port number
const cookieName = "cors-cookie";
const protocol = "http";

function getRedirectTarget(domain) {
  return `${protocol}://cookie-cors.${domain}:3000`;
}

// Configure Nunjucks as the template engine
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Set the 'views' directory for Express to use
app.set("views", "views");

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Define a route
app.get("/", (req, res) => {
  const message = req?.cookies[cookieName] ?? "no message from the cookie";
  res.render("index.html", { message });
});

app.get("/setsession", (req, res) => {
  let redirectTarget = "";
  let redirectURL = "/setsetsession";
  const cookieContent = req?.query?.content ?? req?.cookies[cookieName];
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
    redirectTarget = getRedirectTarget("hasssan.com");
    redirectURL = `${redirectTarget}/setsession?content=${cookieContent}`;
  }
  if (domain.includes("hasssan.com")) {
    options.domain = ".hasssan.com";
    redirectTarget = getRedirectTarget("hassan.web.id");
    redirectURL = `${redirectTarget}/`;
  }
  res.cookie(cookieName, cookieContent, options);
  res.redirect(`${redirectURL}`);
});

app.post("/login", (req, res) => {
  // let redirectTarget = "";
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
    // redirectTarget = getRedirectTarget("hasssan.com");
  }
  if (domain.includes("hasssan.com")) {
    options.domain = ".hasssan.com";
    // redirectTarget = getRedirectTarget("hassan.web.id");
  }
  res.cookie(cookieName, cookieContent, options);
  res.json({});
  // res.redirect(302, `${redirectTarget}/setsession?content=${cookieContent}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
