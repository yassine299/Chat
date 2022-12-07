import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Channel from "./components/Channel";
import logo from "../src/Google.png"

firebase.initializeApp({
  apiKey: "AIzaSyCgN9jH4x_Jw-kHSOsXL6yxs5kiAhxXD1A",
  authDomain: "chat-98bdf.firebaseapp.com",
  projectId: "chat-98bdf",
  storageBucket: "chat-98bdf.appspot.com",
  messagingSenderId: "857942179799",
  appId: "1:857942179799:web:9c2fe709c1e3660632d592"
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setuser] = useState(() => auth.currentUser);
  const [initializing, setinitializing] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setuser(user);
      }
      else {
        setuser(null);
      }
      if (initializing) {
        setinitializing(false);
      }
    })
    return unsubscribe;
  }, [])
  const signwithgoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error)
    }
  }

  const signout = async () => {
    try {
      await firebase.auth().signOut();
    }
    catch (error) {
      console.log(error.message)
    }
  }

  if (initializing) return "Loading....";

  return (
    <div >
      <nav class="navbar navbar-light bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand">open Chat</a>
        </div>
      </nav>

      {user ? (
        <>
          <button className="btn btn-danger" onClick={signout}>Sign out</button>
          <Channel user={user} db={db} />
        </>
      ) : (
        <>
          <figure class="text-center">
            <blockquote class="blockquote">
              <p>This is the place when you can Chat new people just Like olde Times .</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              just sign in <cite title="Source Title">Using Google and You Ready To Go , Have fun</cite>
            </figcaption>
          </figure>
          < button className="btn btn-primary position-absolute top-50 start-50 translate-middle" onClick={signwithgoogle}>sign with <img style={{ width: "30px", height: "30px" }} src={logo} /> </button>
        </>
      )}
    </div>
  );
}
export default App;