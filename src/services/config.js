import _axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    || "http://localhost:4000";

const handleRes = res => {
  return res;
};

const handleErr = err => {
  console.log(err);
  return err;
}

const axios = _axios;
axios.interceptors.request.use(handleRes, handleErr);
axios.interceptors.response.use(handleRes, handleErr);

const api = _axios.create({withCredentials: true});
api.interceptors.request.use(handleRes, handleErr);
api.interceptors.response.use(handleRes, handleErr);

export {
  REACT_APP_API_URL,
  api,
  axios
  
}
