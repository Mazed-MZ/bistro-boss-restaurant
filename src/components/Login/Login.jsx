import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const provider = new GoogleAuthProvider();

export default function Login() {

    const { signinwithpass, googleSignin } = useContext(UserContext);

    const [showMessage, setMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = { email, password };
        // console.log(user);
        signinwithpass(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate(from, { replace: true });
                if (user.uid) {
                    Swal.fire({
                        title: "User Logged in Successfully",
                        icon: "success"
                    });
                }
                fetch('https://bistro-boss-restaurant-server.onrender.com/loginuser', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage)
            });
    }


    const handleGoogleSignin = () => {
        googleSignin(provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                if (user.uid) {
                    Swal.fire({
                        title: "User Logged in Successfully",
                        icon: "success"
                    });
                }

                fetch('https://bistro-boss-restaurant-server.onrender.com/googleuser', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(() =>
                        navigate(from, { replace: true })
                    )
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                setMessage(errorMessage)
                // if(errorMessage){

                // }
            });
    }

    return (
        <div className='md:bg-cover -mt-5 md:bg-[url("https://images2.alphacoders.com/106/1068711.jpg")]'>
            <p className="md:text-center md:translate-y-28 text-center mt-5">
                {
                    showMessage ? <div className="badge badge-error w-full text-white md:text-3xl md:p-8 p-5 text-xl">Your given information is invalid</div> : <span className="hidden"></span>
                }
            </p>
            <div className="hero md:pt-48 text-center md:pl-20 md:pr-20 pb-40 md:pb-72">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:text-white md:pl-20 lg:text-left">
                        <h1 className="md:text-8xl text-5xl font-bold">Log in</h1>
                        <p className="hidden md:block py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        {/* {
                            showMessage ? <div className="badge badge-error text-white md:text-3xl md:p-8 p-5 text-xl">{showMessage}</div> : <span className="hidden"></span>
                        } */}
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-500 bg-opacity-75 text-white md:text-primary md:glass">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text md:text-primary text-white font-bold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text md:text-primary text-white font-bold">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover md:text-primary text-white font-bold">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-1">
                                <button className="btn btn-primary md:text-black text-white" type="submit">LOGIN</button>
                                <label className="label">
                                    <Link to="/signup" className="label-text-alt flex link link-hover md:text-primary text-white font-bold">New to Bistro Boss Restaurant? <p className="text-info pl-1">Sign Up here</p></Link>
                                </label>
                                <Divider>Or</Divider>
                                <button onClick={handleGoogleSignin} className="btn btn-primary md:text-black text-white mt-3">CONTINUE WITH GOOGLE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
