import React, { useState } from 'react'

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

        fetch('http://localhost:5000/addDoctor', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }


    return (
        <div className='text-center p-28'>
            <h1 className='text-5xl m-12'>404 Page not Found</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFileChange} type="file" name="file" id="" />
                <input className='btn btn-outline btn-primary' type="submit" name='submit' />
            </form>
        </div>
    )
}
