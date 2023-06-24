import React, {useEffect, useState} from "react";
import Header from "../../common/header";
import ListComponent from "../../common/list-component";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {getProfile} from "../../../services/user/user-service";
import {
  findFollow, follow,
  getFolloweeCount,
  getFollowerCount, unfollow
} from "../../../services/follow/follow-service";
import {getUserLikedBook} from "../../../services/like-book/like-book-service";
import {getUserLikedLists} from "../../../services/like-list/like-list-service";
import {getUserBookLists} from "../../../services/booklist/booklist-service";

const ProfileOther = () => {
  const {uid} = useParams();
  const [userinfo, setUserinfo] = useState(null);
  const {currentUser} = useSelector(state => state.user);
  const [follower, setFollower] = useState("0");
  const [followee, setFollowee] = useState("0");
  const [isFollow, setIsFollow] = useState("");
  const [likedBook, setLikedBook] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [createLists, setCreateLists] = useState([]);


  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getProfile(uid);
      setUserinfo(res);

      const followerCnt = await getFollowerCount(uid);
      const followeeCnt = await getFolloweeCount(uid);
      setFollower(followerCnt);
      setFollowee(followeeCnt);

      const likedBooks = await getUserLikedBook(uid);
      setLikedBook(likedBooks);

      const likedLists = await getUserLikedLists(uid);
      const lists = likedLists.map(l => l.bookList);
      setLikedList(lists);

      if (res && res.role === 'creator') {
        const createListsRes = await getUserBookLists(res._id);
        setCreateLists(createListsRes);
      }

      if (currentUser && currentUser._id) {
        const res = await findFollow(uid, currentUser._id);
        if (res && res[0] && res[0]._id) {
          setIsFollow(res[0]._id)
        }
      }
    };

    getUserInfo().catch(err => console.log(err))
  }, [uid, currentUser])

  if (currentUser && currentUser._id === uid) {
    return <Navigate to="/profile"/>;
  }

  const handleFollow = async () => {
    if (isFollow) {
      const res = await unfollow(isFollow);
      if (res && res.acknowledged) {
        setIsFollow("");
        setFollower((parseInt(follower) - 1).toString());
      }
    } else {
      const info = {
        follower: currentUser._id,
        followee: uid
      }
      const res = await follow(info);
      if (res && res._id) {
        setIsFollow(res._id)
        setFollower((parseInt(follower) + 1).toString());
      }
    }
  }

  return (
      <div className="container">
        <Header search={false}/>
        <div className="text-center mt-5">
          <h4 className="fw-bold">{userinfo && userinfo.fullname}</h4>
          <div>
            <p className="mt-2 text-secondary">@{userinfo
                && userinfo.username}</p>
          </div>
          <span className="text-secondary ps-4">{userinfo
              && userinfo.location}</span>
          <span className="text-secondary ps-4">{userinfo
              && userinfo.website}</span>
          <p className="mt-2 text-dark ">{userinfo && userinfo.bio}</p>
          <span className="fw-bolder">{followee}</span>
          <span className="text-danger"> Following</span>
          <span className="fw-bolder ps-4">{follower}</span>
          <span className="text-primary"> Follower</span>
        </div>

        {currentUser && currentUser._id &&
            <div className="text-center mt-3">
              {
                <button className={`btn ${isFollow ? "btn-primary"
                    : "btn-danger"} rounded-pill`}
                        onClick={handleFollow}
                >
                  {isFollow ? "Unfollow" : "follow"}
                </button>
              }
            </div>}

        <div className="mt-4" style={{backgroundColor:"yellow"}}>
          {userinfo && userinfo.role === "creator" && createLists && createLists.length > 0 &&
              <ListComponent title="CREATED BOOKLISTS" isList={true} lists={createLists}/>}
          {likedBook && <ListComponent title="LIKED BOOKS" lists={likedBook}/>}
          {userinfo && userinfo.role === ('common' || 'admin') && likedList && <ListComponent title="LIKED BOOKLISTS" lists={likedList} isList={true}/>}
        </div>
      </div>
  );
};
export default ProfileOther;