import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading("true");

        // this.form.validateAll();

        //-------------------------------------------------------------------

        if (this.checkBtn.context._errors.length === 0) {
        
            AuthService.login(email, password).then(
                () => {
                    window.location.reload();
                },
                (error) => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    setLoading(false)
                    setMessage(resMessage)
                }
            );
        } else {
          setLoading(false)
        }
    };

    return (
        <>
            <Form
                onSubmit={(e) => handleLogin(e)}
                // ref={(c) => {
                //     this.form = c;
                // }}
            >
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <Input type="email" className="form-control" name="email" value={email} onChange={(e) => onChangeUsername(e)} validations={[required]} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input type="password" className="form-control" name="password" value={password} onChange={(e) => onChangePassword(e)} validations={[required]} />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        <span>Login</span>
                    </button>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton
                    style={{ display: "none" }}
                    // ref={(c) => {
                    //     this.checkBtn = c;
                    // }}
                />
            </Form>
        </>
    );
};

export default Login;
