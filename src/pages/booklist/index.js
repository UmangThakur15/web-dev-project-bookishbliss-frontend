import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "../common/header";
import {useParams} from "react-router";
import {
  deleteBookInList,
  getBookList
} from "../../services/booklist/booklist-service";
import BookComponent from "../common/book-component";
import {useSelector} from "react-redux";
import {
  findUserLikeList,
  likelist, unlikelist
} from "../../services/like-list/like-list-service";

const BookList = () => {
  const {lid} = useParams();
  const [list, setList] = useState({});
  const {currentUser} = useSelector(state => state.user);
  const [showDelete, setShowDelete] = useState(false);
  const [like, setLike] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await getBookList(lid);
      setList(res);
      if (res && res.creator && currentUser && res.creator._id
          === currentUser._id) {
        setShowDelete(true);
      }
      if (currentUser) {
        const likeRes = await findUserLikeList(currentUser._id, lid);
        if (likeRes.length && likeRes[0]._id) {
          setLike(likeRes[0]._id);
        }
      }
    };

    getData().catch(err => console.log(err));
  }, [lid, currentUser])

  const handleDelete = async (idx, bid) => {
    const res = await deleteBookInList(list._id, bid);
    if (res && res.acknowledged) {
      let books = JSON.parse(JSON.stringify(list.books));
      books.splice(idx, 1);
      setList({...list, books})
    }
  }

  const handleLike = async () => {
    if (!currentUser) {
      navigate('/login');
    }
    if (!like.length) {
      const likeinfo = {
        user: currentUser._id,
        bookList: lid
      };
      const res = await likelist(likeinfo);
      if (res && res._id) {
        setLike(res._id);
      }
    } else {
      const res = await unlikelist(like);
      if (res && res.acknowledged) {
        setLike("");
      }
    }
  }

  return (
      <div className="container">
        <Header/>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="ps-3 pt-3">{list && list.title}</h1>
            <span className="fw-bold ps-3 pt-3">
              Created by
                <Link to={`/profile/${list && list.creator ? list.creator._id
                    : "#"}`} className="wd-link"> {list && list.creator
                    && (list.creator.fullname || list.creator.username)}
                </Link>
            </span>
            <p className="ps-3 pt-3">{list && list.intro}</p>
          </div>
          <div className="p-2" onClick={handleLike}>
            {like.length ?
                <i className="bi bi-heart-fill fw-bolder fs-2 text-danger"></i>
                :
                <i className="bi bi-heart fw-bolder fs-2 text-secondary"></i>}
          </div>
        </div>

        <div className="my-4 wd-bg-blue rounded">
          <div className="d-flex flex-wrap">
            {list && list.books && list.books.map(
                (ele, idx) =>
                    <BookComponent
                        key={idx}
                        index={idx}
                        info={ele}
                        showDelete={showDelete}
                        handleDelete={handleDelete}/>)}
          </div>
        </div>
      </div>
  );
}
export default BookList;