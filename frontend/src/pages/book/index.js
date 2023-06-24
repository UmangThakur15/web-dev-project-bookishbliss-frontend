import React, {useEffect, useState} from "react";
import Header from "../common/header";
import {useParams} from "react-router";
import {getBookInfo} from "../../services/book/book-service";
import {useSelector} from "react-redux";
import {
  createReview, deleteReview,
  getReviewByBook
} from "../../services/review/review-service";
import {
  findUserLikeBook,
  likebook,
  unlikebook
} from "../../services/like-book/like-book-service";
import {Link, useNavigate} from "react-router-dom";
import PopupModal from "../common/popup-modal";
import {
  addBookToList,
  getUserBookLists
} from "../../services/booklist/booklist-service";
import {Alert, Button} from "react-bootstrap";

const Book = () => {
  const {isbn} = useParams();
  const [bookInfo, setBookInfo] = useState({});
  const {currentUser} = useSelector(state => state.user);
  const [comments, setComments] = useState([]);
  const [curComment, setCurComment] = useState("");
  const [like, setLike] = useState("");
  const [showLists, setShowLists] = useState(false);
  const [booklists, setBookLists] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      let res = await getBookInfo(isbn);
      let reviewRes = await getReviewByBook(isbn);
      if (currentUser) {
        let likeRes = await findUserLikeBook(currentUser._id, isbn);
        if (likeRes.length && likeRes[0]._id) {
          setLike(likeRes[0]._id);
        }
        if (currentUser.role === 'creator') {
          let lists = await getUserBookLists(currentUser._id);
          setBookLists(lists);
        }
      }
      setBookInfo(res);
      setComments(reviewRes);
    }
    fetchInfo().catch(e => console.log(e));
  }, [isbn, currentUser])

  const handleComment = async () => {
    const review = {user: currentUser._id, book: isbn, content: curComment};
    const res = await createReview(review);
    setComments([...res, ...comments]);
  }

  const handleLike = async () => {
    if (!currentUser) {
      navigate('/login');
    }
    if (!like.length) {
      const likeinfo = {
        user: currentUser._id,
        isbn13: isbn,
        image: bookInfo.image,
        title: bookInfo.title
      };
      const res = await likebook(likeinfo);
      if (res && res._id) {
        setLike(res._id);
      }
    } else {
      const res = await unlikebook(like);
      if (res && res.acknowledged) {
        setLike("");
      }
    }
  }

  const handleAddToList = async (lid) => {
    const book = {
      isbn13: isbn,
      image: bookInfo.image,
      title: bookInfo.title,
      subtitle: bookInfo.subtitle,
      authors: bookInfo.authors,
      rating: bookInfo.rating
    }
    const res = await addBookToList(lid, book);
    if (res && res.acknowledged) {
      setAlert({type: 0, message: "Add succeed!"})
    } else {
      setAlert({type: 1, message: "Add failed!"})
    }
  }

  const handleDelete = async (rid, idx) => {
    const res = await deleteReview(rid);
    if (res && res.acknowledged) {
      let cpComments = JSON.parse(JSON.stringify(comments));
      cpComments.splice(idx, 1);
      setComments(cpComments);
    }
  }


  return (
      <div className="container">
        <Header/>
        <div className="row">
          <div className="card mt-3 col-4 wd-bg-sameblue">
            <div className="card-img col-12">
              <img className="rounded-bottom"
                   src={bookInfo.image} alt={"BOOK"} width="100%"/>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="p-1"
                   onClick={handleLike}>
                {like.length ?
                    <i className="bi bi-heart-fill fw-bolder fs-2 text-danger"></i>
                    :
                    <i className="bi bi-heart fw-bolder fs-2 text-secondary"></i>}

              </div>
              {currentUser && currentUser.role === 'creator' &&
                  <div>
                    <div className="d-flex justify-content-center p-1 ms-5"
                         onClick={() => {
                           setShowLists(true)
                         }}
                    >
                      <i className="bi bi-bookmark-plus fs-3"></i>
                    </div>

                    <PopupModal
                        title={"Add to BookList"}
                        show={showLists}
                        handleClose={() => {
                          setShowLists(false)
                        }}>
                      {booklists && booklists.length > 0 ?
                          <div>
                            {booklists.map((list, idx) =>
                                <div key={idx}
                                     className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="fw-bold fs-5">
                                    {list.title}
                                  </div>
                                  <Button onClick={() => {
                                    handleAddToList(list._id)
                                  }}>add</Button>
                                </div>
                            )}
                            {alert && alert.message &&
                                <Alert variant={alert.type === 1 ? "danger"
                                    : "success"}>{alert.message}</Alert>
                            }
                          </div>
                          : <div className="fw-bold text-center">No Book
                            List</div>}
                    </PopupModal>
                  </div>
              }

            </div>


          </div>
          <div className="card mt-3 col-8 wd-bg-sameblue">
            <div className="card-header">Book Details</div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <h5>Book name: </h5>
                  <span className="text-secondary">{bookInfo.title}</span>
                </div>
                <div className="mb-3">
                  <h5>Book author: </h5>
                  <span className="text-secondary">{bookInfo.authors}</span>
                </div>
                <div className="mb-3">
                  <h5>Book price: </h5>
                  <span className="text-secondary">{bookInfo.price}</span>
                </div>
                <div className="mb-3">
                  <h5>Publish Year: </h5>
                  <span className="text-secondary">{bookInfo.year}</span>
                </div>
                <div className="mb-3">
                  <h5>Publisher: </h5>
                  <span className="text-secondary">{bookInfo.publisher}</span>
                </div>
                <div className="mb-3">
                  <h5>Description: </h5>
                  <span className="text-secondary">{bookInfo.desc}</span>
                </div>
                <div className="mb-3">
                  <h5>More details: </h5>
                  <span
                      className="text-secondary text-decoration-none"
                      onClick={() => window.location.href = bookInfo.url}
                  >
                    Click me!</span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card mt-2 col-8 offset-4 wd-bg-sameblue pb-5">
            <div className="card-header">Comments for this book</div>
            <div className=" list-group wd-bg-sameblue">
              {currentUser &&
                  <li
                      className="list-group-item m-0 wd-bg-sameblue d-flex justify-content-around align-items-center">
                    <input placeholder="Please input the comment"
                           className="form-control"
                           value={curComment}
                           onChange={e => setCurComment(e.target.value)}
                    />
                    <button className="btn btn-primary float-end"
                            onClick={handleComment}
                    >
                      Comment
                    </button>
                  </li>}
              {
                comments.length ? comments.map((c, idx) =>
                        <li
                            key={idx}
                            className="list-group-item border-bottom rounded-0 wd-bg-sameblue">
                          {currentUser && currentUser.role === "admin" &&
                              <div className="float-end p-1" onClick={() => {
                                handleDelete(c._id, idx)
                              }}>
                                <i className="bi bi-trash"></i>
                              </div>
                          }
                          <div className="m-1 row">
                            <Link
                                className="text-secondary col-2 text-decoration-none"
                                to={`/profile/${c.user._id}`}
                            >
                              {c.user.fullname} @{c.user.username}:
                            </Link>
                            <div className="col-8">
                              {c.content}
                            </div>
                            <div className="col-2">
                              {c.createdAt.split('T')[0]}
                            </div>
                          </div>
                        </li>) :
                    <div className="d-flex justify-content-center">
                      No comment
                    </div>
              }
            </div>
          </div>
        </div>
      </div>
  );

};
export default Book;