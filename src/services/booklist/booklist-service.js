import {REACT_APP_API_URL, api} from "../config";

const BOOKLIST_API_URL = `${REACT_APP_API_URL}/booklist`;

export const createBookList = async (info) => {
  const response = await api.post(`${BOOKLIST_API_URL}/createBookList`, info);
  return response.data;
}

export const getUserBookLists = async (uid) => {
  const response = await api.get(`${BOOKLIST_API_URL}/getBooklists/${uid}`);
  return response.data;
}

export const deleteList = async (lid) => {
  const response = await api.delete(`${BOOKLIST_API_URL}/deleteBookList/${lid}`);
  return response.data;
}

export const getLatestBookList = async () => {
  const response = await api.get(`${BOOKLIST_API_URL}/getLatestBookList`);
  return response.data;
}

export const addBookToList = async (lid, book) => {
  const response = await api.put(`${BOOKLIST_API_URL}/addBookToList/${lid}`, book);
  return response.data;
}

export const getBookList = async (lid) => {
  const response = await api.get(`${BOOKLIST_API_URL}/getList/${lid}`);
  return response.data;
}

export const deleteBookInList = async (lid, bid) => {
  const response = await api.delete(`${BOOKLIST_API_URL}/delete/${lid}/${bid}`);
  return response.data;
}