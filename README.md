Install with  
`npm i --save passport-eveonline-v2`

An example Express login can be found here:

```JS
const passport = require("passport");
const express = require("express");
const EveSSO = require("passport-eveonline-v2");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new EveSSO(
    {
      clientID: "id",
      clientSecret: "secret",
      callbackURL: "http://localhost:8080/auth/eveonline/callback",
      scope: "publicData",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("New Login:", profile);
      done(null, profile);
    }
  )
);

const app = express();
app.use(
  require("express-session")({
    secret: "super secret secret key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.redirect("/auth/eveonline"));

app.get(
  "/auth/eveonline",
  passport.authenticate("eveonline-v2", { state: "statehere" }),
  (req, res) => {}
);

app.get(
  "/auth/eveonline/callback",
  passport.authenticate("eveonline-v2", { failureRedirect: "/error" }),
  (req, res) => res.redirect("/profile")
);

app.get("/profile", (req, res) => res.json(req.user));
app.listen(8080, () => console.log("Server listening..."));
```
