import api, {EndPoints} from "../api/axios";

/**
 * User's Services
 */

const user = localStorage.getItem("user");
console.log(("fromLocalStorage : ", user));

export async function createCommentAxios(datas) {
	//   api.defaults.headers.common["Authorization"] = "Bearer " + user.token
	return await api.post(`${EndPoints.comments}`, datas);
}

export async function getCommentAxios(id) {
	//   api.defaults.headers.common["Authorization"] = "Bearer " + user.token
	return await api.get(`${EndPoints.comments}/${id}`);
}

export async function updateCommentAxios(id, datas) {
	//   api.defaults.headers.common["Authorization"] = "Bearer " + user.token
	return await api.put(`${EndPoints.comments}/${id}`, datas);
}

export async function deleteCommentAxios(commentId) {
	//   api.defaults.headers.common["Authorization"] = "Bearer " + user.token
	return await api.delete(`${EndPoints.comments}/${commentId}`);
}
