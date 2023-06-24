import {REACT_APP_API_URL, api} from "../config";

const REVIEW_API_URL = `${REACT_APP_API_URL}/review`;

export const createReview = async (review) => {
  const response = await api.post(`${REVIEW_API_URL}/createReview`, review);
  return response.data;
}

export const getReviewByBook = async (isbn) => {
  const response = await api.get(`${REVIEW_API_URL}/getReviewsByBook/${isbn}`);
  return response.data;
}

export const deleteReview = async (rid) => {
  const response = await api.delete(`${REVIEW_API_URL}/deleteReview/${rid}`);
  return response.data;
}