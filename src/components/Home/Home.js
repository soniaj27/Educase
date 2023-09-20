import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="home flex">
        <h1>Welcome to PopX App</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          iste omnis accusamus aut Fquia ea officia maiores numquam distinctio.
          Similique, esse culpa?
        </p>
        <div className="buttons flex">
          <NavLink to="/signup" className="btn-link">
            <button className="btn-purple">Create Account</button>
          </NavLink>

          <NavLink to="/login" className="btn-link">
            <button className="btn-purlple-shade">Already Register? Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
