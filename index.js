import express from 'express';
import url from 'url';
import session from 'express-session';
import http from 'http';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'aQjK!#n3rP5v&mB^9H@LwDyUz$EXe8Gs',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id: 1, username, phone, orderId, userId, country: 'admin' });
});


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Passport.js
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Implement your authentication logic here
    // Example: Check if username and password are valid
    if (username === username && password === password) {
      return done(null, { id: 1, username: username });
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));  


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

// app.get('/supermarket', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'supermarket.html'));
// });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  	
