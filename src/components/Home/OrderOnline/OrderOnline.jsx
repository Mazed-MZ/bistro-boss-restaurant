import { Link } from "react-router-dom";

export default function OrderOnline() {


    return (
        <div className='mb-16'>
            <div className="md:ml-20 md:mr-20">
                <div className="divider divider-primary"><h1 className="text-4xl font-bold">ORDER ONLINE</h1></div>
            </div>
            <div className="md:ml-72 md:mr-72 mt-8">
                <div className="divider divider-secondary italic"><p>•→ From 10:00am to 11:00pm ←•</p></div>
            </div>
            <div className='text-center pt-12'>
                <div className="carousel carousel-center rounded-box">
                    <div className="hover:bg-slate-100 hover:bg-scale-110 hover:opacity-65 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5">
                        <img src="https://i.ibb.co/TrbDRtn/slide2.jpg" alt="Pizza" />
                    </div>
                    <div className="hover:bg-slate-100 hover:bg-scale-110 hover:opacity-65 carousel-item hover:ease-in-out hover:delay-150 m-5 hover:-translate-y-1 hover:scale-110 duration-500 hover:overflow-hidden">
                        <img src="https://i.ibb.co/5hh7WVL/slide3.jpg" alt="Soups" />
                    </div>
                    <div className="hover:bg-slate-100 hover:bg-scale-110 hover:opacity-65 m-5 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 hover:overflow-hidden">
                    <Link to="/desserts"><img src="https://i.ibb.co/pJbzwMS/slide4.jpg" alt="Deserts" /></Link>
                    </div>
                </div>
                <div className="flex justify-center md:w-full py-2 md:gap-28 gap-12">
                    <button className="btn btn-outline md:w-48 btn-error">PIZZA</button>
                    <button className="btn btn-outline md:w-48 btn-error">SOUPS</button>
                    <Link to="/desserts"><button className="btn btn-outline md:w-48 btn-error">DESSERTS</button></Link>
                </div>
            </div>
        </div>
    )
}
