import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  getFolloweeList,
  unfollow
} from "../../services/follow/follow-service";

const FollowingList = () => {
  const [followings, setFollowings] = useState([]);
  const {currentUser} = useSelector(state => state.user);
  useEffect(() => {
    const fetchList = async () => {
      const list = await getFolloweeList(currentUser._id);
      setFollowings(list);
    }
    fetchList().catch(err => console.log(err));
  }, [currentUser])

  if (!currentUser) {
    return <Navigate to='/login'/>
  }

  const handleUnfollow = async (idx) => {

    const res = await unfollow(followings[idx]._id);
    if (res && res.acknowledged) {
      let editList = JSON.parse(JSON.stringify(followings));
      editList.splice(idx, 1);
      setFollowings(editList);
    }
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
            <div className="card-header text-center">Following List</div>
            <div className="row card-body">
              {followings.length ?
                  followings.map((f, idx) =>
                      <div key={idx} className="col-lg-6 col-md-12 col-sm-12">
                        <li className="list-group-item">
                          <div className="row">
                            <Link className="col-8 text-decoration-none" to={`/profile/${f.followee._id}`}>
                              <div className="fw-bold ms-1 text-black">{f.followee.fullname}</div>
                              <div className="text-secondary ms-1">@{f.followee.username}</div>
                            </Link>
                            <div className="col-4">
                              <button className="btn btn-primary rounded-pill"
                                      onClick={() => {
                                        handleUnfollow(idx)
                                      }}
                              >
                                Unfollow
                              </button>
                            </div>
                          </div>
                        </li>
                      </div>)
                  :
                  <div className="text-center fw-bold mt-3">No Following</div>}
            </div>
          </div>
        </div>
      </div>
  );

};

export default FollowingList;