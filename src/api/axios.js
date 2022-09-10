import axios from "axios";



/**
 * Create axios instance
 */
const api = axios.create({
	baseURL: process.env.REACT_APP_API_ADRESS + "/api/",
});

export default api;

/**
 * Endpoints used to fetch api
 */
export const EndPoints = {
	auth: "auth",
	users: "users",
	posts: "posts",
	comments: "comments",
};
