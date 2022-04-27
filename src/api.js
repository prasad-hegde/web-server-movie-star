import axios from "axios";

const domain = 'https://movie-star-server.herokuapp.com';

export const publishMovie = (payload) => axios.post(`${domain}/movies/publish`, payload);

export const getAllMovies = (location) => `${domain}/movies/filterLocation?location=${location}`;
// export const getAllMovies = () => `${domain}/movies/all`;


export const searchMovie = (search) => axios.get(`${domain}/movies/findAll?keyword=${search}`);

export const getAmovie = (id) => `${domain}/movies/${id}`;

export const signup = (payload) => axios.post(`${domain}/users/register`, payload);

export const login = (payload) => axios.post(`${domain}/users/login`, payload);


export const book = (payload) => axios.post(`${domain}/createBooking`, payload);

export const fetchBooking = (email) => `${domain}/booking/user?email=${email}`;

export const fetchBookingById = (id) => `${domain}/booking/${id}`;

export const getReservedSeats = (payload) => axios.post(`${domain}/booking/reserved`, payload);