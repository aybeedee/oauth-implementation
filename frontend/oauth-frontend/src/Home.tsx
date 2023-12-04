import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import OAuthSymbol from './assets/oauth.png'
import GoogleIcon from './assets/google.png'
import './App.css'

function getGoogleOAuthURL() {
  const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  console.log({ options });

  const queryString = new URLSearchParams(options);

  console.log(queryString.toString());

  return `${rootURL}?${queryString.toString()}`;
}

function Home() {

  const navigate = useNavigate();
  
  const [loggedIn, setLoggedIn] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    const checkLogin = async () => {
        try{
          const res = await axios.get("http://localhost:3000/login");
          console.log(res);
          setLoggedIn(res.data.loggedIn);
          if (res.data.loggedIn) {
            navigate("/profile");
          }
        } catch(err) {
            console.log(err);
        }
    }
    checkLogin();
}, [])

  return (
    <>
      <div>
        <img src={OAuthSymbol} className="logo" alt="OAuth Symbol" />
      </div>
      <h1>OAuth Prototype</h1>
      <div className="card">
        <a href={getGoogleOAuthURL()}>
        <button>
          <div className="signin">
            <img src={GoogleIcon} className="button-logo" />
            <p>Sign in with Google</p>
          </div>
        </button>
        </a>
        <p>
          Click to sign in to the application with your Google account
        </p>
      </div>
      <p className="read-the-docs">
        Prototype Implementation of OAuth
      </p>
      <p className="read-the-docs">
        Supporting Google
      </p>
    </>
  )
}

export default Home
