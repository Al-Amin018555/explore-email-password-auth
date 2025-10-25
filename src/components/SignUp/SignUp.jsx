import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const SignUp = () => {
    const [success, setSucess] = useState(false);
    const [errorMessage, setErrorMeassage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, password, terms);

        if (!terms) {
            setErrorMeassage('Please accept our terms and conditions')
            return;
        }
        //validate a user
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (passwordRegExp.test(password) === false) {
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

                        <div className="relative">
                            <input name="password"
                                type={showPassword ? 'text' : 'password'}
                                className="input"
                                placeholder="Password" />
                            <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute top-2 right-6">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>

                        </div>
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <label className="label mt-4">
                            <input type="checkbox" name="terms" className="checkbox" />
                            Accept terms and conditions
                        </label>
                        <br />
                        <button className="btn btn-neutral mt-4">SignUp</button>
                    </form>
                    <p>Already have an account? Please <Link className="text-blue-400 underline" to='/login'>Login</Link></p>
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