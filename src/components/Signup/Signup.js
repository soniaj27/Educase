import React, { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.name &&
      user.phone &&
      user.email &&
      user.password &&
      user.companyName
    ) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUser = userCredential.user;

          // Store additional user data in Firestore
          const userDocRef = doc(db, "users", newUser.uid);

          const userData = {
            displayName: user.name,
            phoneNumber: user.phone,
            email: user.email,
            password: user.password,
            companyName: user.companyName,
          };

          console.log(user.name);
          setDoc(userDocRef, userData)
            .then(() => {
              toast.success("Registration Successful...");
              navigate("/login");
              setUser({
                name: "",
                phone: "",
                email: "",
                password: "",
                companyName: "",
              });
            })
            .catch((error) => {
              toast.error("Error storing user data: " + error.message);
            });
        })
        .catch((error) => {
          toast.error("Error signing up: " + error.message);
        });
    } else {
      toast.error("All fields are required.");
    }
  };

  return (
    <div className="container">
      <div className="signup-box flex">
        <h2>Create your PopX account</h2>
        <div className="input-container flex">
          <div className="input-box flex">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              onChange={handleChange}
            />
            <label htmlFor="name">Full Name</label>
          </div>
          <div className="input-box flex">
            <input
              type="text"
              name="phone"
              id="phone"
              autoComplete="off"
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone number</label>
          </div>
          <div className="input-box flex">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              onChange={handleChange}
            />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="input-box flex">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-box flex">
            <input
              type="text"
              name="companyName"
              id="companyName"
              autoComplete="off"
              onChange={handleChange}
            />
            <label htmlFor="companyName">Company Name</label>
          </div>
          <div className="radio-box">
            <p className="agency">Are you an Agency?</p>
            <div className="radio-btn flex">
              <div className="box flex">
                <input type="radio" name="yes" id="yes" />
                <p>Yes</p>
              </div>
              <div className="box flex">
                <input type="radio" name="yes" id="no" />
                <p>No</p>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons flex">
          <NavLink to="/profile" className="btn-link">
            <button className="btn-purlple-shade" onClick={handleSubmit}>
              Login
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
