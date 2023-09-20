import React, { useEffect, useState } from "react";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userlogo from "../../userlogo.png";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email); // Set user email when it becomes available
    }
  }, [user]);

  useEffect(() => {
    if (userEmail) {
      navigate("/profile");
    }
  }, [userEmail, navigate]);

  const logout = () => {
    try {
      signOut(auth)
        .then(() => {
          // signed out successfully
          toast.success("Logout Successfully");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <div className="profile-container flex">
        <div className="info flex">
          <figure>
            <img src={userlogo} alt="user-profile" />
          </figure>
          <div className="name">
            {userEmail && <h4>{userEmail}</h4>}
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          omnis in, ullam nesciunt dolorum eaque?
        </p>
        <NavLink to="/login" className="btn-link">
          <button className="btn-purple" onClick={logout}>Logout</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;
