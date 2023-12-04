import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import qs from 'qs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
    },
  })
);


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user,
    })
  }
  else {
    res.send({
      loggedIn: false,
    })
  }
})

app.get("/api/sessions/oauth/google", async (req, res) => {

  // get the code from the query params
  const code = req.query.code;

  const url = "https://oauth2.googleapis.com/token";
  
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  try {

    // get the id and access token using the code
    const tokenResult = await axios.post(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { id_token, access_token } = tokenResult.data;

    console.log("id_token: ", id_token);
    console.log("access_token: ", access_token);

    // get the user with the token
    const userResult = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    const user = userResult.data;

    if (!user.verified_email) {
      return res.status(403).send("The Google account's email is not verified");
    }

    const { data, error } = await supabase
    .from('users')
    .upsert({
      email: user.email,
      name: user.name,
      picture: user.picture,
    })
    .select();

    if (error) {
      return res.json(error)
    }
    
    console.log(data);

    req.session.user = user;
    console.log(req.session.user);

    res.redirect(process.env.ORIGIN_URL);

  } catch (error) {
    return res.json(error);
  }
})

app.listen(port, () => {
  console.log(`OAuth backend app listening on port ${port}`)
})