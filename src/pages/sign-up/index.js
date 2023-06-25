import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import HomeButton from "../common/header/home-button";
import {Alert} from "react-bootstrap";
import {signup} from "../../services/user/user-service";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async () => {
    if (password !== conPassword) {
      setError("Please check your password!");
      return;
    }

    const userinfo = {
      username,
      password,
      fullname,
      email,
      role: isCreator ? "creator" : "common"
    };

    const res = await signup(userinfo);
    if (!res) {
      setError("Sign up Error!");
      return;
    }

    navigate('/login');
  }

  return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div className="position-absolute top-0 end-20">
              <HomeButton/>
            </div>
            <img className="col-12" src="https://i.pinimg.com/564x/b7/9c/e8/b79ce822d2e5c4bcc7e799c9aaac0fee.jpg"
                 alt="illustration" style={{paddingTop:"28px"}}/>
          </div>
          
          <div
              className="col-6 offset-1 d-flex align-items-center justify-content-center mt-3">
            <div>
              <i><h2 className="text-center"style={{color:"white"}}>Welcome to Sign Up an Account</h2></i>
              <label htmlFor="UsernameInput"
                     className="col-form-label" style={{color:"white"}}>Username</label>
              <input className="form-control" id="UsernameInput"
                     value={username}
                     onChange={e => setUsername(e.target.value)}
              />

              <label htmlFor="PasswdInput"
                     className="col-form-label" style={{color:"white"}}>Password</label>
              <input type="password" className="form-control" id="PasswdInput"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
              />

              <label htmlFor="ConPasswdInput" className="col-form-label" style={{color:"white"}}>Confirm
                Password</label>
              <input type="password" className="form-control"
                     id="ConPasswdInput"
                     value={conPassword}
                     onChange={e => setConPassword(e.target.value)}
              />

              <label htmlFor="FullNameInput"
                     className="col-form-label" style={{color:"white"}}>FullName</label>
              <input className="form-control" id="FullNameInput"
                     value={fullname}
                     onChange={e => setFullname(e.target.value)}
              />

              <label htmlFor="EmailInput"
                     className="col-form-label" style={{color:"white"}}>Email</label>
              <input type="email" className="form-control" id="EmailInput"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
              />

              <div className="form-check mt-3">
                <label className="form-check-label" htmlFor="SignUpCheckBox" style={{color:"white"}}>
                  Creator
                </label>
                <input className="form-check-input" type="checkbox"
                       id="SignUpCheckBox"
                       checked={isCreator}
                       onChange={e => setIsCreator(e.target.value)}
                />
              </div>

              <Alert className="mt-3 mb-0" variant="danger" show={error.length > 0}>
                {error}
              </Alert>

              <div className="row justify-content-center mt-4">
                <div className="col-5">
                  <button
                      className="btn btn-warning rounded w-100"
                      onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-5 offset-1">
                  <Link to="/login"
                        className="btn btn-secondary rounded w-100 ms-1">
                    Cancel
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  );
}
export default SignUp;