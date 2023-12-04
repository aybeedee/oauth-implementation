import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

interface User {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

function Profile() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User>();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:3000/login");
        console.log(res);
        setLoggedIn(res.data.loggedIn);
        if (res.data.loggedIn) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkLogin();
  }, [])

  const handleLogout = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/logout");
      console.log(res);
      setLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {
        (loggedIn && user) ?
          <>
            <img src={user.picture}/>
            <h1>Welcome, {user.name}</h1>
            <div className="card">
              <p>
              email: {user.email}
              </p>
              <button onClick={handleLogout}>
              <div className="signin">
                <p>Logout</p>
              </div>
              </button>
            </div>
            <p className="read-the-docs">
              verified_email: {user.verified_email ? "true" : "false"}
            </p>
            <p className="read-the-docs">
              locale: {user.locale}
            </p>
          </>
          :
          <>
            <h1>Logged Out</h1>
            <div className="card">
              <p>
                Kindly go back to home page to log in
              </p>
            </div>
            <p className="read-the-docs">
              Prototype Implementation of OAuth
            </p>
            <p className="read-the-docs">
              Supporting Google
            </p>
          </>
      }
    </>
  )
}

export default Profile
