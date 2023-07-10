const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Event = require('./models/event');
const Message = require('./models/message');

app.use(bodyParser.json());


const User = require('./models/user');


// initialize the data base
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://partynav-db-default-rtdb.firebaseio.com"
});

// get an instance of the database
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

          // unauthorized access
          res.sendStatus(401); 
        }
      }).catch((error) => {
        console.log(error);
        // internal server error
        res.sendStatus(500); 
      });
    } catch (error) {
      console.log(error);
      // internal server error
      res.sendStatus(500); 
    }
});

app.post("/makeEvent", (req, res) => {
    try {
        const { organizer, title, description, date, time, address } = req.body;
        // const Event = new Event(organizer, title, description, date, time, address, []);

        console.log(organizer, title, description, date, time, address);
        const eventSnapshot = db.ref('Events/' + title).once('value');
        const eventData = eventSnapshot.val;

        if (eventData) {

            res.send("Event already exists");
        } else {
          db.ref('Events/' + title).set({
            organizer: organizer,
            title: title,
            description: description,
            date: date,
            time: time,
            address: address,
            messages: ['hi']
          });
          res.send(200);
        }
      } catch (error) {
        console.log(error);
      }
});


app.get("/getEvents", (req, res) => {
  try {
    const eventSnapshot = db.ref('Events').once('value');
    eventSnapshot.then((snapshot) => {
      const eventData = snapshot.val();
      const eventList = Object.values(eventData);
      res.send(eventList);

      
    
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500); 
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500); 
  }
});



app.post ("/sendMessage", (req, res) => {
  try {
    const { sender , message, event } = req.body;
    const msg = new Message(sender, message);

    console.log(msg.sender, msg.message);

    // get ref
    const eventMessagesRef = db.ref('Events/' + event.title + '/messages');

    eventMessagesRef.push(msg);

    res.sendStatus(200); 

  } catch (error) {
    console.log(error);
  }
}); 


app.get("/getMessages", (req, res) => {
  try {
    //  the event title in the api link 
    const { eventTitle } = req.query;

    const eventMessagesRef = db.ref('Events/' + eventTitle + '/messages');
    eventMessagesRef.once('value')
      .then((snapshot) => {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData || {});
        res.send(messagesList);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
      
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
