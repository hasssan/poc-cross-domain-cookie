import express from "express";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import cors from "cors";

const ENV = "dev";

const app = express();
const port = 3000; // Set the desired port number
const cookieName = "cors-cookie";
const protocol = "http";

const firstDomain = "hassan.web.id";
const secondDomain = "hasssan.com";

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};
if (ENV === "prod") {
  cookieOptions.secure = true;
  cookieOptions.sameSite = "none";
}

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
  res.render("cross-not-working.html", { message });
});

app.get("/setsession", (req, res) => {
  let redirectTarget = "";
  let redirectURL = "/setsetsession";
  const cookieContent = req?.query?.content ?? req?.cookies[cookieName];
  const domain = req.get("host");

  if (domain.includes(firstDomain)) {
    cookieOptions.domain = `.${firstDomain}`;
    redirectTarget = getRedirectTarget(secondDomain);
    redirectURL = `${redirectTarget}/setsession?content=${cookieContent}`;
  }

  if (domain.includes(secondDomain)) {
    cookieOptions.domain = `.${secondDomain}`;
    redirectTarget = getRedirectTarget(firstDomain);
    redirectURL = `${redirectTarget}/`;
  }

  res.cookie(cookieName, cookieContent, cookieOptions);
  res.redirect(`${redirectURL}`);
});

app.post("/login", (req, res) => {
  let redirectTarget = "";
  const cookieContent = req?.body?.cookieContent;

  const domain = req.get("host");
  if (domain.includes(firstDomain)) {
    cookieOptions.domain = `.${firstDomain}`;
    redirectTarget = getRedirectTarget(secondDomain);
  }

  if (domain.includes(secondDomain)) {
    cookieOptions.domain = `.${secondDomain}`;
    redirectTarget = getRedirectTarget(firstDomain);
  }

  res.cookie(cookieName, cookieContent, cookieOptions);
  res.redirect(`${redirectTarget}/setsession?content=${cookieContent}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
