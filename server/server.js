const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


const User = require('./models/user');


// initialize the data base
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://partynav-db-default-rtdb.firebaseio.com"
});

// get an instanceof the database
var db = admin.database();



app.post("/register", (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User(name, email, password);
      
        console.log(user.username, user.email, user.password);
      
        const userSnapshot = db.ref('Users/' + user.username).once('value');
        const userData = userSnapshot.val;
      
        if (userData) {
            res.send("Username already exists");
        } else {
      
      
            db.ref('Users/' + user.username).set({
                username: user.username,
                email: user.email,
                password: user.password

            });
      
      
        }

        res.sendStatus(200); // Send a success response

    } catch (error) {
        console.log(error);
    }
 });


 app.post("/login", (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const userSnapshot = db.ref('Users/' + username).once('value');
  
      userSnapshot.then((snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.password === password && userData.username === username) {
          const user = new User(userData.username, userData.email, userData.password);
          res.send(user);
        } else {
          res.sendStatus(401); // unauthorized access
        }
      }).catch((error) => {
        console.log(error);
        res.sendStatus(500); // internal server error
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500); // internal server error
    }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
