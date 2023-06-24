import {REACT_APP_API_URL, api} from "../config";

const FOLLOW_API_URL = `${REACT_APP_API_URL}/follow`;

export const getFollowerCount = async (uid) => {
  const response = await api.get(`${FOLLOW_API_URL}/followerCount/${uid}`);
  return response.data;
}

export const getFolloweeCount = async (uid) => {
  const response = await api.get(`${FOLLOW_API_URL}/followeeCount/${uid}`);
  return response.data;
}

export const follow = async (info) => {
  const response = await api.post(`${FOLLOW_API_URL}/follow`, info);
  return response.data;
}

export const findFollow = async (uid, curid) => {
  const response = await api.get(`${FOLLOW_API_URL}/findFollow/${uid}/${curid}`);
  return response.data;
}

export const unfollow = async (fid) => {
  const response = await api.delete(`${FOLLOW_API_URL}/unfollow/${fid}`);
  return response.data;
}

export const getFolloweeList = async (uid) => {
  const response = await api.get(`${FOLLOW_API_URL}/followeeList/${uid}`);
  return response.data;
}

export const getFollowerList = async (uid) => {
  const response = await api.get(`${FOLLOW_API_URL}/followerList/${uid}`);
  return response.data;
}