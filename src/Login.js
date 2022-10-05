import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, createUserWithEmailAndPassword, updateProfile } from "./fb";
import { login } from "./features/userSlice";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const onLogin = (e) => {
    e.preventDefault();

    // auth
  };

  const onRegister = (e) => {
    if (!name) {
      return alert("Please enter a full name.");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // user.displayName = name
        // user.photoURL = profilePic

        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: profilePic,
        })
          .then(() => {
            // Profile updated!
            dispatch(
              login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
            // return alert("Profile updates successfully.");
          })
          .catch((error) => {
            // An error occurred
            return alert("An error occurred. Try again.");
          });
      })
      .catch((error) => alert(error.message));
    e.preventDefault();
  };

  return (
    <div className="login">
      <img
        src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=lR0Vks"
        alt=""
      />
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name (required if registering)"
          type="text"
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile pic URL (optional)"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        <button type="submit" onClick={onLogin}>
          Sign In
        </button>
      </form>
      <p>
        Not a member?{" "}
        <span className="login__register" onClick={onRegister}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
