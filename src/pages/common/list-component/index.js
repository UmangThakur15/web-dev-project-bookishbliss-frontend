import {Link} from "react-router-dom";

const ListComponent = ({
  title,
  isList = false,
  lists
}) => {
  return (
      <ul className="list-group list-group-horizontal wd-bg-blue">
        <li className="list-group-item wd-bg-blue col-3 d-flex align-items-center">
          <h4 className="fw-bold m-3">
            {title.split(' ')[0]}<br/>{title.split(' ')[1]}
          </h4>
        </li>
        <div className="row w-100">
          {lists && lists.length > 0 ?
              lists.map((ele, idx) =>
                  <div key={idx} className="col-lg-3 col-md-6 col-sm-12">
                    <Link to={isList ? `/booklist/${ele._id}` : `/book/${ele.isbn13}`}
                          className="text-decoration-none">
                      <li className="list-group-item wd-bg-blue px-4 col-12">
                        <img className="rounded m-2 d-block"
                             src={ele.image || "/images/bookship.jpeg"}
                             alt={"booklist cover"} width="100%"
                        />
                        <div className="text-center">{ele.title}</div>
                      </li>
                    </Link>
                  </div>)
              : <div
                  className="d-flex justify-content-center align-items-center fw-bold">No
                Content
              </div>}
        </div>
      </ul>
  );
}

export default ListComponent;