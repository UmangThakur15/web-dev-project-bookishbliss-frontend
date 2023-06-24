import UserButton from "../common/header/user-button";
import SearchButton from "../common/header/search-button";
import ListComponent from "../common/list-component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getNewBooks} from "../../services/book/book-service";
import {getUserLikedBook} from "../../services/like-book/like-book-service";
import {getLatestBookList} from "../../services/booklist/booklist-service";
import { FaBook } from 'react-icons/fa';


const Home = () => {
  const {currentUser} = useSelector(state => state.user);
  const [books, setBooks] = useState([]);
  const [lists, setLists] = useState([]);
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    const getData = async () => {
      let list;
      if (currentUser) {
        // like book
        list = await getUserLikedBook(currentUser._id)
        if (list && list.length > 0) {
          setIsLike(true);
        }
      }
      if (!list || list.length === 0) {
        // new book
        const res = await getNewBooks();
        list = res.books
      }
      if (list && list.length) {
        if (list.length > 4) {
          list = list.slice(0, 4);
        }
        setBooks(list);
      }
      const listsRes = await getLatestBookList();
      setLists(listsRes);
    }
    getData().catch(err => console.log(err));
  }, [currentUser])
  return (
      <div className="container" >
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {/* <img height={50} src="/images/logo2.png" className="me-4"
                 alt="logo"/> */}
            <i><h1 className="fw-bold m-3 mt-4" style={{color:"white"}}>Bookish Bliss</h1></i>
            <FaBook size={32} color="white" />
          </div>
          <div className="d-flex">
            <div className="me-3">
              <SearchButton/>
            </div>
            <div>
              <UserButton/>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ListComponent title={isLike ? "LIKED BOOKS" : "NEW BOOKS"} lists={books}/>
          <ListComponent title="LATEST BOOKLISTS" isList={true} lists={lists}/>
        </div>
      </div>
  );
}
export default Home;