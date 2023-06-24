import React from "react";
import UserButton from "./user-button";
import HomeButton from "./home-button";
import SearchButton from "./search-button";

const Header = ({search = true, home = true, user = true}) => {
  return (
      <div className="row">
        <div>
          {home &&
              <div className="float-start me-3">
                <HomeButton/>
              </div>}
          {search &&
              <div className="float-start">
                <SearchButton/>
              </div>}

          {user &&
              <div className="float-end">
                <UserButton/>
              </div>}
        </div>
      </div>
  );
}

export default Header;