import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  getFollowerList
} from "../../services/follow/follow-service";

const FollowingList = () => {
  const [followers, setFollowers] = useState([]);
  const {currentUser} = useSelector(state => state.user);
  useEffect(() => {
    const fetchList = async () => {
      const list = await getFollowerList(currentUser._id);
      setFollowers(list);
    }
    fetchList().catch(err => console.log(err));
  }, [currentUser])

  if (!currentUser) {
    return <Navigate to='/login'/>
  }

  return (
      <div className="container">
        <Link to="/profile">
          <button className="btn btn-secondary rounded-pill mt-4">
            <i className="bi bi-arrow-left me-2"></i>Back
          </button>
        </Link>
        <div className="row">
          <div className="card mt-3 col-8 offset-2 wd-bg-sameblue">
            <div className="card-header text-center">Follower List</div>
            <div className="row card-body">
              {followers.length ?
                  followers.map((f, idx) =>
                      <div key={idx} className="col-lg-6 col-md-12 col-sm-12">
                        <li className="list-group-item">
                          <Link className="row text-decoration-none" to={`/profile/${f.follower._id}`}>
                              <div className="fw-bold ms-1 text-black">{f.follower.fullname}</div>
                              <div className="text-secondary ms-1">@{f.follower.username}</div>
                          </Link>
                        </li>
                      </div>)
                  :
                  <div className="text-center fw-bold mt-3">No Follower</div>}
            </div>
          </div>
        </div>
      </div>
  );

};

export default FollowingList;