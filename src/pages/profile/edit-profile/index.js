import React, {useState} from "react";
import Header from "../../common/header";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {updateUserThunk} from "../../../services/user/user-thunks";

const EditProfile = () => {
  const {currentUser} = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState({
    fullname: (currentUser && currentUser.fullname) || "",
    bio: (currentUser && currentUser.bio) || "",
    location: (currentUser && currentUser.location) || "",
    email: (currentUser && currentUser.email) || "",
    website: (currentUser && currentUser.website) || "",
    dob: (currentUser && currentUser.dob && currentUser.dob.split('T')[0]) || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    dispatch(updateUserThunk(
        {uid: currentUser._id, updateInfo: userInfo})
    );
    navigate("/profile");
  }

  const handleBack = () => {
    navigate(-1);
  }

  if (!currentUser) {
    return <Navigate to="/"/>;
  }

  return (
      <div className="container">
        <Header/>
        <div
            className="card mt-3 justify-content-center col-8 offset-2 {/*col-8*/} wd-bg-sameblue">
          <div className="card-header fw-bolder">
            Profile Details
          </div>
          <div className="card-body">
            <div>
              <div className="gx-3 mb-3">
                <label htmlFor="fullNameInput" className="form-label">Full
                  Name</label>
                <input className="form-control" id="fullNameInput"
                       value={userInfo.fullname}
                       onChange={e => setUserInfo(
                           {...userInfo, fullname: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bioInput" className="form-label">Bio</label>
                <textarea className="form-control" id="bioInput"
                          onChange={e => setUserInfo(
                              {...userInfo, bio: e.target.value})}
                          value={userInfo.bio}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="locationInput"
                       className="form-label">Location</label>
                <input className="form-control" id="locationInput"
                       value={userInfo.location}
                       onChange={e => setUserInfo(
                           {...userInfo, location: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email</label>
                <input className="form-control" id="emailInput"
                       value={userInfo.email}
                       onChange={e => setUserInfo(
                           {...userInfo, email: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="websiteInput"
                       className="form-label">Website</label>
                <input className="form-control" id="websiteInput"
                       value={userInfo.website}
                       onChange={e => setUserInfo(
                           {...userInfo, website: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthInput" className="form-label">Date of
                  Birth</label>
                <input className="form-control" type="date" value={userInfo.dob}
                       onChange={e => setUserInfo(
                           {...userInfo, dob: e.target.value})}
                />
              </div>
              <button className="btn btn-primary rounded-pill me-3"
                      onClick={handleSave}
              >
                Save changes
              </button>
              <button className="btn btn-secondary rounded-pill"
                      onClick={handleBack}
                      style={{color:"white"}}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
  );

};
export default EditProfile;