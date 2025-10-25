import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.init";
import { useState } from "react";
import { Link } from "react-router";
const Login = () => {
    const [success, setSucess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        //reset
        setSucess('')
        setErrorMessage('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setSucess('User Logged in Successfully')
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error.message);
            })


    }
    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto mt-12 shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-4xl font-bold">Login now!</h1>
                <form onSubmit={handleLogin} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" name="email" className="input" placeholder="Email" />
                    <label className="label mt-4">Password</label>
                    <input type="password" name="password" className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>
                <p>New to this website? Please <Link to='/signUp' className="text-blue-500 underline">Sign Up</Link></p>
                {
                    errorMessage && <p className="text-red-500">{errorMessage}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
            </div>
        </div>

    );
};

export default Login;