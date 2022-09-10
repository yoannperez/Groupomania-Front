export const initialState = {
	user: null,
	auth: null,
};


export const actionTypes = {
	SET_AUTH: "SET_AUTH",
	SET_USER: "SET_USER"
};

const reducer = (state, action) => {
	// console.log("From Reducer: ", action);
	switch (action.type) {
		case actionTypes.SET_AUTH:
			return {
				...state,
				auth: action.auth,
			};
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.user,
			};

		default:
			return state;
	}
};
export default reducer;
