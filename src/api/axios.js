import axios from "axios";
/*create an instance of axios with a default base URI when sending HTTP
requests*/
/*JSON Server has CORS Policy by default*/



const api = axios.create({
	baseURL: process.env.REACT_APP_API_ADRESS + "/api/",
	// headers: {
    //     "Access-Control-Allow-Origin": "*"},
});

export default api;

export const EndPoints = {
	auth: "auth",
	users: "users",
	posts: "posts",
	comments: "comments",
};
