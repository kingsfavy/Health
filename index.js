import express from 'express';
import url from 'url';
import session from 'express-session';
import http from 'http';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import passport from 'passport';
import nodemailer from 'nodemailer';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt.js'
const app = express();
const PORT = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'aQjK!#n3rP5v&mB^9H@LwDyUz$EXe8Gs',
  resave: false,
  saveUninitialized: false
}));


const sessionMiddleware = session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser(async (username, done) => {
  try {
    const user = await User.findOne({ username });
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await User.findOne({ username }, '-password'); // Exclude password field
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});




function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}


const uri = "mongodb+srv://kingsley1185:22445131k@cluster0.zveirgt.mongodb.net/vibe?retryWrites=true&w=majority";
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
    
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log(" Connected to MongoDB successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

run();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'effiongkingsley1185@gmail.com',
    pass: 'akhe stdf sqyr vhcu'
  }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format']
  },
  yourname: { type: String, required: false },
  password: { type: String, required: true },
  resetCode: String,
  resetCodeExpiry: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);


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

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'signup.html'));
});


app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'forgot-password.html'));
});

app.post('/signup', async (req, res) => {
  const { username, password, email, yourname } = req.body;

  if (!username || !password || !email || !yourname) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, email, yourname });

  try {
    await newUser.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, user: req.user.username });
});




app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
 
      return res.status(404).json({ success: false, error: "Email not found:", email});
    }

    const secretCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = secretCode;
    user.resetCodeExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: '"vibe" <vibe@gmail.com>',
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${secretCode}, please dont share this code with anyone. It will expire in 15 minutes.`,
      html: `<p>Your password reset code is: <strong>${secretCode}</strong>, please dont share this code with anyone.</p>
      <p>It will expire in 15 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, error: 'Check your internet connection and try again' });
      }
      res.json({ success: true, message: 'Reset code sent via email' });
    });

  } catch (error) {
    console.error("Error in forgot-password route:", error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});



app.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });
  
  if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpiry) {
    return res.status(400).json({ success: false, error: 'Invalid or expired reset code' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetCode = undefined;
  user.resetCodeExpiry = undefined;
  await user.save();

  res.json({ success: true, message: 'Password reset successfully' });
});

// --- Protected HTTP API Routes ---
app.get('/api/profile', ensureAuthenticated, (req, res) => {
    res.json({ user: req.user });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  	
