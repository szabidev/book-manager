import axios from "axios";
import { Book } from "./interfaces";

const BASE_URL = "http://localhost:3001/books";

export const getAllBooks = () =>
  axios.get(BASE_URL).then((response) => response.data);

export const addBook = (data: Book) =>
  axios.post(BASE_URL, data).then((response) => response.data);

export const updateBook = (id: number, data: Book) =>
  axios.put(`${BASE_URL}/${id}`, data).then((response) => response.data);

export const deleteBook = (id: number) => axios.delete(`${BASE_URL}/${id}`);
