import React from 'react'

export default function BistroBrief() {
    return (
        <div>
            <div className="hero min-h-screen bg-fixed" style={{ backgroundImage: 'url(https://i.ibb.co/SDTWTF9/chef-service.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold font-Times">Bistro Boss</h1>
                        <p className="first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-white
  first-letter:mr-3 first-letter:float-left text-left leading-loose">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                    </div>
                </div>
            </div>
            <div className='bg-black ml-28 mr-28 mt-12 mb-12 p-12'>
                <h1 className='text-center text-4xl font-mono'>Call Us: +88 0192345678910</h1>
            </div>
        </div>
    )
}