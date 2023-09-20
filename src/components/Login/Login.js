import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          toast.success("Login successfully");
          // when user sign in successfully then navigate to the dashboard page
          navigate("/profile");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("All fields required");
    }
  };

  return (
    <div className="container">
      <div className="login-box flex">
        <h2>Signin to your PopX account</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        </p>
        <div className="input-container flex">
          <div className="input-box flex">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="input-box flex">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="buttons flex">
          <button className="btn-purlple-shade" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
