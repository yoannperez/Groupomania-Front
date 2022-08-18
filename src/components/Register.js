import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import {registerUser} from "../services/authService";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();
	const navigate = useNavigate();

	const [message, setMessage] = useState("");

	const onSubmit = (credentials) => {
		try {
			registerUser(credentials).then((res) => {
				console.log(res);
				setMessage(`${res.data.message}, Veuillez vous connecter`)
				// navigate("/")
			});
		} catch (error) {}
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
					<input type='texte' placeholder='Username' {...register("username", {required: true})} />
					{errors.username && <span className='alert'>Username invalid</span>}
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
