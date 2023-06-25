import {REACT_APP_API_URL, api} from "../config";

const LIKELIST_API_URL = `${REACT_APP_API_URL}/likelist`;

export const likelist = async (info) => {
  const response = await api.post(`${LIKELIST_API_URL}/like`, info);
  return response.data;
}

export const unlikelist = async (llid) => { 
  const response = await api.delete(`${LIKELIST_API_URL}/unlike/${llid}`);
  return response.data;
}

export const findUserLikeList = async (uid, lid) => {
  const response = await api.get(`${LIKELIST_API_URL}/user/${uid}/list/${lid}`);
  return response.data;
}

export const getUserLikedLists = async (uid) => {
  const response = await api.get(`${LIKELIST_API_URL}/getLikeListsByUser/${uid}`);
  return response.data;
}