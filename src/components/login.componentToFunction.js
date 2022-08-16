import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

import {login} from "../services/authService";
import {useStateValue} from "../utils/context/StateProvider";
import {actionTypes} from "../utils/Reducer/Reducer";

const required = (value) => {
	if (!value) {
		return (
			<div className='alert alert-danger' role='alert'>
				This field is required!
			</div>
		);
	}
};

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [{user}, dispatch] = useStateValue();

	const onChangeUsername = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const fetchUser = async () => {
		// handleToggle();
		setLoading("true");
		try {
			const {data} = await login(email, password);
			dispatch({
				type: actionTypes.SET_USER,
				user: data,
			});
			localStorage.setItem("user", JSON.stringify(data));
			navigate("/");
			//   setProducts(data);
		} catch (error) {
			console.log("Something is wrong");
			const resMessage =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			setLoading(false);
			setMessage(resMessage);
		}
		// handleClose();
	};

	const handleLogin = (e) => {
		e.preventDefault();
		fetchUser();
	};

	return (
		<>
			<Form onSubmit={(e) => handleLogin(e)}>
				<div className='form-group'>
					<label htmlFor='email'>E-mail</label>
					<Input
						type='email'
						className='form-control'
						name='email'
						value={email}
						onChange={(e) => onChangeUsername(e)}
						validations={[required]}
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<Input
						type='password'
						className='form-control'
						name='password'
						value={password}
						onChange={(e) => onChangePassword(e)}
						validations={[required]}
					/>
				</div>

				<div className='form-group'>
					<button className='btn btn-primary btn-block' disabled={loading}>
						{loading && <span className='spinner-border spinner-border-sm'></span>}
						<span>Login</span>
					</button>
				</div>

				{message && (
					<div className='form-group'>
						<div className='alert alert-danger' role='alert'>
							{message}
						</div>
					</div>
				)}
			</Form>
		</>
	);
};

export default Login;
