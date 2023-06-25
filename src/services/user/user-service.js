import {REACT_APP_API_URL, api} from "../config";

const USER_API_URL = `${REACT_APP_API_URL}/user`

export const signup = async (user) => {
  const response = await api.post(`${REACT_APP_API_URL}/register`, user);
  return response.data;
}

export const login = async (user) => {
  const response = await api.post(`${REACT_APP_API_URL}/login`, user);
  return response.data;
}

export const logout = async () => {
  const response = await api.post(`${REACT_APP_API_URL}/logout`);
  return response.data
}

export const updateUser = async (uid, updateInfo) => {
  const response = await api.put(`${USER_API_URL}/updateProfile/${uid}`,
      updateInfo);
  return response.data; 
}

export const getProfile = async (uid) => {
  const response = await api.get(`${USER_API_URL}/profile/${uid}`);
  return response.data;
}