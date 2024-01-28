import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { UserContext } from "../providers/AuthProviders";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

const provider = new GoogleAuthProvider();

export default function SignUp() {

    const { createUserWithEmail, googleSignin } = useContext(UserContext);

    const [showMessage, setMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/';

    const [file, setFile] = useState(null);

    // // --->>> File Upload <<<---
    const handleFileChange = e => {
        const newFile = e.target.files[0];
        setFile(newFile);
        console.log(newFile);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const user = { name, email, password };
        // console.log(user);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        console.log(formData)


        //create user in firebase
        createUserWithEmail(email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigate(from, { replace: true });
                // console.log(user.uid);
                if (user.uid) {
                    Swal.fire({
                        title: "Created Account Successfully",
                        icon: "success"
                    });

                    fetch('http://localhost:5000/signinuser', {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(data => console.log(data))
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMessage(errorCode, errorMessage)
                // ..
            });
    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPassValid = e.target.value.length > 6;
            const PassUseNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPassValid && PassUseNumber;
        }
        if (isFormValid) {
            console.log('form is valied')
        }
        else {
            Swal.fire({
                icon: "error",
                title: "😢..Your given information is invalid.",
                text: "Please follow required condition",
            });
        }
    }

    const handleGoogleSignin = () => {
        googleSignin(provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                if (user.uid) {
                    Swal.fire({
                        title: "Account Created Successfully",
                        icon: "success"
                    });
                }
                fetch('http://localhost:5000/googleuser', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                navigate(from, { replace: true });
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                setMessage(errorMessage)
                // ...
            });
    }


    // const [file, setFile] = useState(null);

    // // --->>> File Upload <<<---
    // const handleFileChange = e => {
    //     const newFile = e.target.files[0];
    //     setFile(newFile);
    //     console.log(newFile);
    // }

    // // --->>> File Upload <<<---
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     // console.log(formData)

    //     fetch('http://localhost:5000/addDoctor', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }


    return (
        <div>
            <div className="card card-side pb-96 bg-[url('https://pbs.twimg.com/ext_tw_video_thumb/1661296285368954880/pu/img/qwrloSK7mdqYB2Vl.jpg:large')]">
                <div className='m-5 pt-24 md:pt-16 md:ml-96 md:pl-72'>
                    <div className="md:text-white text-center md:mr-28 pb-8">
                        <h1 className="md:text-8xl text-center text-5xl font-bold">SIGN UP</h1>
                        {
                            showMessage ? <div className="badge badge-error text-white md:text-3xl md:p-8 mt-5 p-5 w-full text-xl">Already have an account in this email</div> : <span className="hidden"></span>
                        }
                    </div>
                    <div className="card shrink-0 w-full shadow-2xl bg-slate-500 bg-opacity-75 text-white md:text-primary md:glass">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text md:text-primary text-white font-bold">Type your name</span>
                                </label>
                                <input type="text" name="name" placeholder="Full name" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text md:text-primary text-white font-bold">Upload Profile Photo</span>
                                </label>
                                <input onChange={handleFileChange} type="file" className="file-input file-input-bordered file-input-warning w-full" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text md:text-primary text-white font-bold">Email</span>
                                </label>
                                <input onBlur={handleBlur} type="email" name="email" placeholder="email" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text md:text-primary text-white font-bold">Password</span>
                                </label>
                                <input onBlur={handleBlur} type="password" name="password" placeholder="password" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                                <label className="label">
                                    <span className="label-text text-white font-bold badge hover:text-red-500 mb-3 gap-2">Use at least 6 character with number</span>
                                </label>
                            </div>
                            <label className="label">
                                <Link to="/login" className="label-text-alt flex link link-hover md:text-primary text-white font-bold">Already have an account? <p className="text-info pl-1">Login</p></Link>
                            </label>
                            <div className="form-control grid grid-cols-2 gap-3">
                                <button className="btn w-full btn-primary md:text-black text-white" type="submit">SIGN UP</button>
                                <button onClick={handleGoogleSignin} className="btn w-full btn-primary md:text-black text-white">CONTINUE WITH GOOGLE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
