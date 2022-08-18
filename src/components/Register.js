import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import {login} from "../services/authService";
import {useStateValue} from "../utils/context/StateProvider";
import {actionTypes} from "../utils/Reducer/Reducer";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();
	const navigate = useNavigate();

	const [message, setMessage] = useState("");
	const [{user}, dispatch] = useStateValue();

	const onSubmit = (credentials) => {
		fetchUser(credentials);
	};

	const fetchUser = async ({email, password}) => {
		// try {
		// 	const {data} = await login(email, password);
		// 	dispatch({
		// 		type: actionTypes.SET_USER,
		// 		user: data,
		// 	});
		// 	localStorage.setItem("auth", JSON.stringify(data));
			
		// 	setTimeout(() => {
		// 		// navigate.push("/")
		// 		window.location.reload();
		// 	}, 500);

		// } catch (error) {
		// 	console.log("Something is wrong");
		// 	const resMessage =
		// 		(error.response && error.response.data && error.response.data.message) ||
		// 		error.message ||
		// 		error.toString();
		// 	setMessage(resMessage);
		// }
	};

	return (
		<>
        Register
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='form-group'>
					{/* <label htmlFor='email'>E-mail</label> */}
					<input
						type='email'
						placeholder='Email'
						{...register("email", {required: true, pattern: /^\S+@\S+$/i})}
					/>
					{errors.email && <span className='alert'>Veuillez indiquer un email valid</span>}
				</div>

				<div className='form-group'>
					<input
						type='password'
						placeholder='password'
						{...register("password", {required: true})}
					/>
					{errors.password && <span className='alert'>Mot de passe invalid</span>}
				</div>

				{message && (
					<div className='form-group'>
						<div className='alert alert-danger' role='alert'>
							{message}
						</div>
					</div>
				)}

				<input type='submit' className='btn btn-primary' />
			</form>
		</>
	);
};

export default Register;
