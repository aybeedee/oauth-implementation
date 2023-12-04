import './App.css'

function Profile() {

  return (
    <>
      <h1>OAuth Prototype</h1>
      <div className="card">
        <button>
          <div className="signin">
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

export default Profile
