const OAuth2Strategy = require("passport-oauth2");
const jwt = require("jsonwebtoken");

module.exports = class Strategy extends OAuth2Strategy {
  constructor(options, verify) {
    options = options || {};
    options.authorizationURL = "https://login.eveonline.com/v2/oauth/authorize";
    options.tokenURL = "https://login.eveonline.com/v2/oauth/token";
    super(options, verify);
    OAuth2Strategy.call(this, options, verify);
    this.name = "eveonline-v2";
  }

  userProfile(accessToken, done) {
    const jwtToken = jwt.decode(accessToken);
    done(null, {
      character_id: parseInt(jwtToken.sub.split(":").pop()),
      character_name: jwtToken.name,
      jwt: jwtToken,
    });
  }
};
