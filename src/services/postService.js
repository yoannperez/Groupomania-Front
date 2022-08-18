import api, {EndPoints} from "../api/axios";

// const user = localStorage.getItem("user");
// console.log(("fromLocalStorage : ", user));


export async function createPostsAxios(post) {
	// axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
	return await api.post(EndPoints.posts, post);
}

export async function getAllPostsAxios() {
	return await api.get(EndPoints.posts);
}


/**
 * UPDATE Post
 * @param {number} postId Id 
 * @param {object} post datas to update
 * @returns 
 */
export async function updatePostsAxios(postId, post) {
	return await api.put(`${EndPoints.posts}/${postId}`, post);
}

export async function deletePostsAxios(postId) {
	return await api.delete(`${EndPoints.posts}/${postId}`);
}