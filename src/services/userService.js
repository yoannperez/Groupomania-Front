import api, { EndPoints } from '../api/axios';

/**
 * User's Services
 */

// const user = localStorage.getItem('user')
// console.log(('fromLocalStorage : ', user));

/**
 * Get user's information with his id
 * @param {object} auth User's object model
 * @returns {Object} User's object informations
 */
export async function getUsersAxios(user) {  
  api.defaults.headers.common["Authorization"] = "Bearer " + user.token
  return await api.get(EndPoints.users+'/'+user.userId);
}

export async function updateUsersAxios(user, data) {  
  api.defaults.headers.common["Authorization"] = "Bearer " + user.token
  return await api.put(`${EndPoints.users}/${user.userId}`, data);
}

/**
 * Delete user
 *
 */
export async function deleteUsersAxios(user) {  
  // console.log("axios user: ", user);
  api.defaults.headers.common["Authorization"] = "Bearer " + user.token
  return await api.delete(`${EndPoints.users}/${user.userId}`);
}

// import { SaleType } from '../models/sale-type';

// axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
// axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;

