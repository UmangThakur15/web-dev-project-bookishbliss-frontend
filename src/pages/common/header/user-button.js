import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const UserButton = () => {
  const {currentUser} = useSelector(state => state.user);

  return (
      <Link to="/login">
        <button className="btn btn-secondary rounded-pill mt-4">
          {currentUser ? currentUser.username : "Log In"}
        </button>
      </Link>
  );
}

export default UserButton;