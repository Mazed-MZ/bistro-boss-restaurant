import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function OrderOnline() {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div className='mb-16 mt-28'>
            <div className="md:ml-20 md:mr-20">
                <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-in">ORDER ONLINE</h1></div>
            </div>
            <div className="md:ml-72 md:mr-72 mt-8">
                <div className="divider divider-secondary italic" data-aos="zoom-out"><p>•→ From 10:00am to 11:00pm ←•</p></div>
            </div>
            <div className='md:ml-72 md:mr-72 mt-8 md:grid md:grid-cols-3 md:gap-12 ml-5' data-aos="fade-up"
                data-aos-anchor-placement="center-bottom">
                <div className="card w-96 h-full image-full mb-5">
                    <figure><img src="https://i.ibb.co/TrbDRtn/slide2.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <div className="mt-36 card-actions justify-center">
                            <button className="btn btn-primary btn-outline">PIZZA</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 h-full image-full mb-5">
                    <figure><img src="https://i.ibb.co/5hh7WVL/slide3.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <div className="card-actions justify-center mt-36">
                            <button className="btn btn-primary btn-outline">SOUPS</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 image-full">
                    <figure><img src="https://i.ibb.co/pJbzwMS/slide4.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <div className="card-actions justify-center mt-36">
                            <Link to="/desserts"><button className="btn btn-primary btn-outline">DESSERT</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
