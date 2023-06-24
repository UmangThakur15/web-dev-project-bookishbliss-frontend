import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../../services/user/user-thunks";
import HomeButton from "../../common/header/home-button";
import SearchButton from "../../common/header/search-button";
import ListComponent from "../../common/list-component";
import {
  getFolloweeCount,
  getFollowerCount
} from "../../../services/follow/follow-service";
import PopupModal from "../../common/popup-modal";
import {Button} from "react-bootstrap";
import {
  createBookList, deleteList,
  getUserBookLists
} from "../../../services/booklist/booklist-service";
import {getUserLikedBook} from "../../../services/like-book/like-book-service";
import {getUserLikedLists} from "../../../services/like-list/like-list-service";

const Profile = () => {
  const {currentUser} = useSelector(state => state.user);
  const [follower, setFollower] = useState(0);
  const [followee, setFollowee] = useState(0);
  const [bookListInfo, setBookListInfo] = useState({});
  const [showBookList, setShowBookList] = useState(false);
  const [showEditBookList, setShowEditBookList] = useState(false);
  const [bookLists, setBookLists] = useState([]);
  const [likedBook, setLikedBook] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      const followerCnt = await getFollowerCount(currentUser._id);
      const followeeCnt = await getFolloweeCount(currentUser._id);
      setFollower(followerCnt);
      setFollowee(followeeCnt);

      if (currentUser.role === 'creator') {
        const lists = await getUserBookLists(currentUser._id);
        setBookLists(lists);
      }

      const likedBooks = await getUserLikedBook(currentUser._id);
      setLikedBook(likedBooks);

      const likedLists = await getUserLikedLists(currentUser._id);
      const lists = likedLists.map(l => l.bookList);
      setLikedList(lists);
    }

    getInfo().catch(err => console.log(err))
  }, [currentUser])

  if (!currentUser) {
    return <Navigate to='/login'/>
  }

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/");
  }

  const openEdit = (idx) => {
    setBookListInfo(bookLists[idx]);
    setShowEditBookList(true)
  }

  const saveBookList = async () => {
    if (bookListInfo._id) {
      // edit
    } else {
      // create
      bookListInfo.creator = currentUser._id;
      const res = await createBookList(bookListInfo);
      if (res && res._id) {
        // push to user's book list
        setBookLists(pre => [res, ...pre])
        setShowEditBookList(false);
        setBookListInfo({});
      }
    }
  }

  const deleteBookList = async (idx) => {
    const list = bookLists[idx];
    const res = await deleteList(list._id);
    if (res && res.acknowledged) {
      let editList = JSON.parse(JSON.stringify(bookLists));
      editList.splice(idx, 1);
      setBookLists(editList);
    }
  }

  return (
      <div className="container">
        <div className="row">
          <div className="clearfix">
            <div className="float-end">
              <SearchButton/>
            </div>

            <div className="float-start me-3">
              <HomeButton/>
            </div>

            <button
                className="btn btn-secondary rounded-pill float-start mt-4"
                onClick={handleLogout}
            >
              logout
            </button>

            {currentUser && currentUser.role === 'creator' &&
                <div>
                  <button
                      className="btn btn-secondary rounded-pill float-start mt-4 ms-3"
                      onClick={() => {
                        setShowBookList(prevState => !prevState)
                      }}
                  >
                    BookList
                  </button>

                  <PopupModal
                      title={`${currentUser.fullname} Book List`}
                      show={showBookList}
                      handleClose={() => {
                        setShowBookList(false)
                      }}
                      footer={<Button onClick={() => {
                        setBookListInfo({})
                        setShowEditBookList(true)
                      }
                      }>Create</Button>}
                  >
                    {bookLists.length ? bookLists.map((list, idx) =>
                            <div key={idx} className="row">
                              <div className="col-8">
                                <div className="fw-bold fs-5">{list.title}</div>
                                <em>{list.intro}</em>
                              </div>
                              <div className="col-4">
                                <Button className="me-2" onClick={() => {openEdit(idx)}}>
                                  edit
                                </Button>
                                <Button variant="danger" onClick={() => {deleteBookList(idx)}}>
                                  delete
                                </Button>
                              </div>
                            </div>) :
                        <div className="fw-bold text-center">No Book List</div>}

                  </PopupModal>

                  <PopupModal
                      title={bookListInfo._id ? "Edit" : "Create"}
                      show={showEditBookList}
                      handleClose={() => {
                        setShowEditBookList(false)
                      }}
                      isStatic={true}
                      footer={<Button onClick={saveBookList}>Save</Button>}
                  >
                    <label htmlFor="titleInput"
                           className="col-form-label">Title</label>
                    <input className="form-control" id="titleInput"
                           value={bookListInfo.title || ""}
                           onChange={e => setBookListInfo(pre => {
                             return {...pre, title: e.target.value}
                           })}
                    />

                    <label htmlFor="introInput"
                           className="col-form-label">Intro</label>
                    <input className="form-control" id="introInput"
                           value={bookListInfo.intro || ""}
                           onChange={e => setBookListInfo(pre => {
                             return {...pre, intro: e.target.value}
                           })}
                    />
                  </PopupModal>
                </div>

            }

          </div>
        </div>

        <div className="text-center mt-5">
          <h4 className="fw-bold">{currentUser && currentUser.fullname}</h4>
          <div>
            <span className="text-secondary">@{currentUser
                && currentUser.username}</span>
          </div>
          <span className="text-secondary ps-4">{currentUser
              && currentUser.location}</span>
          <span className="text-secondary ps-4">{currentUser
              && currentUser.website}</span>
          <span className="text-secondary ps-4">{currentUser
              && currentUser.email}</span>
          <span className="text-secondary ps-4">{currentUser && currentUser.dob
              && currentUser.dob.split(
                  'T')[0]}</span>
          <p>{currentUser && currentUser.bio}</p>
          <Link to="/following" className="text-decoration-none">
            <span className="fw-bolder text-secondary">{followee}</span>
            <span className="text-danger"> Following</span>
          </Link>
          <Link to="/follower" className="text-decoration-none">
            <span className="fw-bolder ps-4 text-secondary">{follower}</span>
            <span className="text-primary"> Follower</span>
          </Link>
        </div>
        <div className="text-center mt-3">
          <Link to="/edit-profile">
            <button className="btn btn-primary rounded-pill">Edit Profile
            </button>
          </Link>
        </div>
        <div className="mt-4 wd-bg-blue">
          {likedBook && <ListComponent title="LIKED BOOKS" lists={likedBook}/>}
          {currentUser &&
              <ListComponent title="LIKED BOOKLISTS" lists={likedList} isList={true}/>}
          {currentUser && currentUser.role === "creator" && bookLists.length > 0 &&
              <ListComponent title="CREATED BOOKLISTS" isList={true} lists={bookLists}/>}
        </div>
      </div>
  );
};
export default Profile;