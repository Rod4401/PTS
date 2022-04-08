const express = require('express');
var http = require('http');
const cors = require('cors');
const app = express();port = 3080; app.use(cors());

const SteamAuth = require("node-steam-openid");
const SteamAPI = require('./SteamAPI.js');
const key = "4F37C85BF44BB9F940E697AFDADA1419";
const steam = new SteamAPI(key);

steam.initAll(app);

const steamAuth = new SteamAuth({
  realm: "http://localhost:3080", // Site name displayed to users on logon
  returnUrl: "http://localhost:3080/auth/steam/authenticate", // Your return route
  apiKey: key // Steam API key
});

app.get("/auth/steam", async (req, res) => {
  const redirectUrl = await steamAuth.getRedirectUrl();
  return res.redirect(redirectUrl);
});

app.get("/auth/steam/authenticate", async (req, res) => {
  try {
    const user = await steamAuth.authenticate(req);
    const redirectUrl = `http://localhost:4200/steamid/${user.steamid}`;
    return res.redirect(redirectUrl);
    //...do something with the data
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () =>{
  console.log('Serveur is running on port 3080');
});
