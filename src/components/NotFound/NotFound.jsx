import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {


    const [file, setFile] = useState(null);

    // --->>> File Upload <<<---
    const handleFileChange = e => {
        const newFile = e.target.files[0];
        setFile(newFile);
        console.log(newFile);
    }

    // --->>> File Upload <<<---
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file);
        // console.log(formData)

        fetch('https://bistro-boss-restaurant-server.onrender.com/addImage', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }


    return (
        <div className='text-center pl-10 pr-10 pt-20'>
            <div>
                <div className="hero md:min-h-screen" style={{ backgroundImage: 'url(https://bistro-boss-restaurant-server.onrender.com/404.gif)' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-xl font-bold">Oops..Sorry!!!</h1>
                            <p className="mb-5">This page not found</p>
                            <Link to="/"><button className='btn btn-outline btn-primary'>Back To Home Page</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-28'>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleFileChange} type="file" name="file" id="" />
                    <input className='btn btn-outline btn-primary' type="submit" name='submit' />
                </form>
            </div>
        </div>
    )
}
