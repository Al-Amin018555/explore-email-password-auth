import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";

const SignUp = () => {
    const [errorMessage,setErrorMeassage] = useState('');

    const handleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setErrorMeassage('');
            })
            .catch(error => {
                console.log(error);
                setErrorMeassage(error.message)
            })
    }
    return (
        <div className="max-w-2/4  mx-auto flex justify-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-12">
                <div className="card-body">
                    <h1 className="text-4xl font-bold">Please SignUp now!</h1>
                    <form onSubmit={handleSignUp}>
                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Email" />
                        <label className="label mt-4">Password</label>
                        <input name="password" type="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">SignUp</button>
                    </form>
                    {
                        errorMessage && <p className="text-red-500">{errorMessage}</p>
                    }
                </div>
            </div>

        </div>
    );
};

export default SignUp;