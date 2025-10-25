import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";

const SignUp = () => {
    const [success, setSucess] = useState(false);
    const [errorMessage, setErrorMeassage] = useState('');

    const handleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        //validate a user
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if(passwordRegExp.test(password) === false){
            setErrorMeassage('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
            return;
        }

        //create a user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setErrorMeassage('')
                setSucess(true)
            })
            .catch(error => {
                console.log(error);
                setErrorMeassage(error.message)
                setSucess(false)
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
                    {
                        success && <p className="text-green-500">User created Sucessfully</p>
                    }
                </div>
            </div>

        </div>
    );
};

export default SignUp;