import api, { EndPoints } from '../api/axios';

/**
 * User's Services
 */

const user = localStorage.getItem('user')
console.log(('fromLocalStorage : ', user));

/**
 * Get user's information with his id
 * @param {number} id User's id
 * @returns {Object} User's object informations
 */
export async function getUsersAxios(id) {  
  // console.log("id", id.userId)
  // api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  // api.defaults.headers.common["Authorization"] = "Bearer " + user.token
  return await api.get(EndPoints.users+'/'+id.userId);
}



// import { SaleType } from '../models/sale-type';

// axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
				// axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;

