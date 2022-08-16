import api, {EndPoints} from "../api/axios";
// import { SaleType } from '../models/sale-type';

// axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
// axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;

const user = localStorage.getItem("user");
console.log(("fromLocalStorage : ", user));

export async function login(email, password) {
	return await api.post(`${EndPoints.auth}/signin`, {email, password})
}

export async function register(username, email, password) {
	return await api.post(`${EndPoints.auth}/signup`, {
		username,
		email,
		password,
	});
}

export function logout() {
	localStorage.removeItem("user");
}

export function getCurrentUser() {
	return JSON.parse(localStorage.getItem("user"));
}

/* Other commonly-used api methods: 
api.post
api.put 
api.delete 
api.patch
*/
/* The < > bracket here is a Generic type that Typescript adapted from OOP. It means that the return value of the getSalesAxios is an array of SaleType.
This would likewise help us with the TypeScript intell-sense when using it.
*/
