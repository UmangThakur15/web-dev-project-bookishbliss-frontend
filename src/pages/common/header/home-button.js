import {Link} from "react-router-dom";
import React from "react";

const HomeButton = () => {
  return (
      <Link to="/">
        <button
            className="btn btn-secondary rounded-pill mt-4">
          <i className="bi bi-house me-2"></i>Home
        </button>
      </Link>
  );
}

export default HomeButton;