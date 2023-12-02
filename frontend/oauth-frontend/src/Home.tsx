import OAuthSymbol from './assets/oauth.png'
import GoogleIcon from './assets/google.png'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function Home() {

  return (
    <>
      <div>
        <img src={OAuthSymbol} className="logo" alt="OAuth Symbol" />
      </div>
      <h1>OAuth Prototype</h1>
      <div className="card">
        <button>
          <div className="signin">
            <img src={GoogleIcon} className="button-logo" />
            <p>Sign in with Google</p>
          </div>
        </button>
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
