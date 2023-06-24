import {Link} from "react-router-dom";

const BookComponent = ({index, info, showDelete, handleDelete}) => {
  return (
      <div className="col-lg-6 col-md-12">
        <div className="d-flex flex-row justify-content-between">
          <Link to={`/book/${info.isbn13}`}
                className="text-decoration-none text-black d-flex flex-row">
            <img className="rounded" height={200} src={info.image}
                 alt={"cover"}/>
            <div className="d-flex flex-column mt-3 justify-content-around">
              <p className="fw-bold">{info.title}</p>
              <p>{info.subtitle}</p>
              {info.authors && <p>Authors: {info.authors}</p>}
              {info.rating > 0 &&
                  <p>
                    <i className="bi bi-star-fill text-warning"></i>
                    <span className="ms-2">{info.rating}</span>
                  </p>}
            </div>
          </Link>
          {showDelete &&
              <div className="mt-3 p-2"
                   onClick={() => {
                     handleDelete(index, info._id);
                   }}
              >
                <i className="bi bi-x-circle"></i>
              </div>}
        </div>


      </div>
  );
}

export default BookComponent;