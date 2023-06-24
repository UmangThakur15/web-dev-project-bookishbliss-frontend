import {Link} from "react-router-dom";
import React from "react";

const SearchButton = () => {
  return (
      <Link to="/search">
        <button
            className="btn btn-secondary rounded-pill mt-4">
          <i className="bi bi-search me-2"></i>Search
        </button>
      </Link>
  );
}

export default SearchButton;