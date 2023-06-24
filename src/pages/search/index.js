import React, {useEffect, useState} from "react";
import HomeButton from "../common/header/home-button";
import UserButton from "../common/header/user-button";
import {searchBook} from "../../services/book/book-service";
import BookComponent from "../common/book-component";
import {useNavigate, useSearchParams} from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword') || "";
  const searchPage = searchParams.get('page') && searchParams.get('page') > 0
      ? searchParams.get('page') : "1";
  const [keyword, setKeyword] = useState(searchKeyword);
  const [searchResult, setSearchResult] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      const res = await searchBook(searchKeyword, searchPage);
      setSearchResult(res);
    };

    if (searchKeyword) {
      getResult().catch(err => console.log(err));
    }
  }, [searchKeyword, searchPage])

  const handleSearch = async () => {
    navigate(`/search?keyword=${keyword}`);
  }
  const handleNextPages = async () => {
    navigate(`/search?keyword=${keyword}&page=${parseInt(searchPage) + 1}`);
  }

  const handlePrePages = async () => {
    navigate(`/search?keyword=${keyword}&page=${parseInt(searchPage) - 1}`);
  }

  return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <HomeButton/>
          </div>

          <div className="col-7">
            <div className="input-group mt-4">
              <input
                  className="form-control rounded-0 rounded-start"
                  placeholder="Search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-secondary rounded-0 rounded-end"
                        type="button"
                        onClick={handleSearch}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="float-end">
              <UserButton/>
            </div>
          </div>
        </div>

        {searchResult && searchResult.books && searchResult.books.length > 0 ?
            <div>
              <div className="mt-4 wd-bg-blue rounded">
                <p className="fw-bold ps-3 pt-3">Found {searchResult.total} results</p>
                <div className="d-flex flex-wrap">
                  {searchResult.books.map(
                      (item, idx) => <BookComponent key={idx} info={item}/>)}
                </div>
              </div>

              <div align="middle" className="my-3">
                <button className="btn rounded-pill" onClick={handlePrePages}
                        hidden={searchPage === '1'}>
                  ← Previous
                </button>
                <span
                    className="align-middle fw-bold"> Page {searchResult.page}
                </span>
                <button className="btn rounded-pill"
                        onClick={handleNextPages}>
                  Next →
                </button>
              </div>
            </div> :
            <div
                className="d-flex justify-content-center align-items-center mt-5 fw-bolder" style={{color:"white"}}>
              No result
            </div>}

      </div>
  );
}
export default Search;