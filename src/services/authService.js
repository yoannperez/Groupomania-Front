import api, {EndPoints} from "../api/axios";

/**
 * Authentication Services
 */

/**
 * Login Function
 */
export async function login(email, password) {
	return await api.post(`${EndPoints.auth}/signin`, {email, password})
}

/**
 * Register Function
 */
export async function register(username, email, password) {
	return await api.post(`${EndPoints.auth}/signup`, {
		username,
		email,
		password,
	});
}

/**
 * Logout Function
 */
export function logout() {
	localStorage.removeItem("user");
}

/**
 * Get curent user from localStorage
 */
export function getCurrentUser() {
	return JSON.parse(localStorage.getItem("user"));
}




// axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
// axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;

// const user = localStorage.getItem("user");
// console.log(("fromLocalStorage : ", user));