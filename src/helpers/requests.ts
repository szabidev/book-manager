import axios from "axios";

const BASE_URL = "http://localhost:3001/books";

export const getAllBooks = () =>
  axios.get(BASE_URL).then((response) => response.data);

export const addBook = (data: any) =>
  axios.post(BASE_URL, data).then((response) => response.data);

export const updateBook = (id: number, data: any) =>
  axios.put(`${BASE_URL}/${id}`, data).then((response) => response.data);

export const deleteBook = (id: number) => axios.delete(`${BASE_URL}/${id}`);
