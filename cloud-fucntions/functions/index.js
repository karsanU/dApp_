const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
admin.initializeApp();
const app = express();

// setup new user
exports.createUserDoc = functions.auth.user().onCreate((user) => {
  const players = {};
  for (let i = 0; i < 4; i++) {
    players[i] = {
      id: i,
      color: null,
    };
  }
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      email: user.email,
      name: null,
      colors: ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163"],
      players,
    });
});

/* EXPRESS APP  */
// CROSS
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type ,  Authorization,");
  next();
};
app.use(allowCrossDomain);

const auth = async function (req, res, next) {
  console.log("Auth Middleware");
  try {
    console.log(req.headers);
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error(401, "User is not authorized");
    }

    if (!authorization.startsWith("Bearer")) {
      throw new Error(401, "User is not authorized");
    }

    const split = authorization.split("Bearer ");
    if (split.length !== 2) {
      throw new Error(401, "User is not authorized");
    }

    const token = split[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.setHeader("email", decodedToken.email);
    next();
  } catch (error) {
    console.log("END");
    next(error);
  }
};

// get data
app.get("/color", auth, async (req, res) => {
  try {
    const { uid } = req.query;
    const user = admin.firestore().collection("users").doc(uid);
    const doc = await user.get();
    res.status(200);
    return res.send(doc.data());
  } catch (err) {
    res.status(400);
    console.log(err);
    return res.send(err);
  }
});
app.put("/color", auth, async (req, res) => {
  try {
    const { uid, playerId, newColor, token } = req.body;
    const user = admin.firestore().collection("users").doc(uid);
    const doc = await user.get();
    const players = doc.data().players;
    let colors = doc.data().colors;
    // if requested color is available
    if (newColor && colors.includes(newColor)) {
      players[playerId]["color"] = newColor;
      colors = colors.filter((color) => color !== newColor);
      // if the player already has a color remove it
    } else if (players[playerId]["color"]) {
      colors.push(players[playerId]["color"]);
      players[playerId]["color"] = null;
    } else {
      throw new Error("invalid change request");
    }
    await user.update({
      players,
      colors: [...colors],
    });
    res.status(200);
    return res.send(req.body.color);
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.send(err);
  }
});

// Expose Express API as a single Cloud Function:
exports.app = functions.https.onRequest(app);
