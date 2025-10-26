import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
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
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, password, name, photo, terms);

        setErrorMeassage('')
        setSucess(false)

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
                //email verfiy
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        setSucess(true)
                        alert('We sent you a verification email. please check your email')
                    })
                //update user profile
                const profile = {
                    displayName: name,
                    photoURL: photo,
                }
                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        console.log("user profile updated");
                    })
                    .catch((error) => {
                        console.log(error);
                    })

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
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input mb-4" placeholder="Your Name" />
                        <label className="label">Photo URL</label>
                        <input type="text" name="photo" className="input mb-4" placeholder="Your photo URL" />
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