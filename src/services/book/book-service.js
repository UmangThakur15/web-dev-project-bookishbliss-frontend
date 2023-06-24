import {axios} from "../config";

const REMOTE_API = "https://api.itbook.store/1.0";

export const getBookInfo = async (isbn) => {
  const response = await axios.get(`${REMOTE_API}/books/${isbn}`);
  return response.data;
}

export const searchBook = async (keyword, page = 1) => {
  const response = await axios.get(`${REMOTE_API}/search/${keyword}?page=${page}`);
  return response.data;
}

export const getNewBooks = async () => {
  const response = await axios.get(`${REMOTE_API}/new`);
  return response.data;
}