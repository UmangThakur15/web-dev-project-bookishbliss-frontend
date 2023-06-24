import {Link, Navigate} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../services/user/user-thunks";
import HomeButton from "../common/header/home-button";
import {Alert} from "react-bootstrap";

const Login = () => {
    const {currentUser} = useSelector(state => state.user)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const login = () => {
        dispatch(loginThunk({username, password}));
        if (!currentUser) {
            setError("Login failed!");
        }
    }

    if (currentUser) {
        return (<Navigate to={'/profile'}/>);
    }

    return (
        <div className="container">
          <div className="row">
              <div className="col-5">
                  <div className="position-absolute top-0 end-20">
                      <HomeButton/>
                  </div>
                  <img className="col-12" src="/images/bookship.jpeg" alt="illustration"/>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-center">
                  <div>
                      <h1 className="text-center">Welcome Back</h1>
                      <label htmlFor="UsernameInput" className="col-form-label">Username</label>
                      <input className="form-control" id="UsernameInput"
                             value={username}
                             onChange={e => setUsername(e.target.value)}
                      />

                      <label htmlFor="PasswdInput" className="col-form-label">Password</label>
                      <input type="password" className="form-control" id="PasswdInput"
                             value={password}
                             onChange={e => setPassword(e.target.value)}
                      />

                      <Alert className="mt-3 mb-0" variant="danger" show={error.length > 0}>
                          {error}
                      </Alert>

                      <button className="btn btn-warning rounded w-100 mt-4" onClick={login}>Log In</button>
                      <p className="text-center mt-3">Don't have an account?
                          <span>
                              <Link to="/signup" className="btn btn-link align-baseline">Sign up</Link>
                          </span>
                      </p>
                  </div>
              </div>
          </div>
        </div>
    );
}
export default Login;