import api, {EndPoints} from "../api/axios";
// import { SaleType } from '../models/sale-type';

// axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
// axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;

const user = localStorage.getItem("user");
console.log(("fromLocalStorage : ", user));

export async function getAllPostsAxios() {
	return await api.get(EndPoints.posts);
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