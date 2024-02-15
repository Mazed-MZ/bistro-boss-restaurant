import { useEffect, useState } from 'react'
import DessertCart from './DessertCart';
import useMenu from '../../shared/AllMenuData';
import Aos from "aos";
import 'aos/dist/aos.css';

export default function Desserts() {

    const [menu] = useMenu();
    const desserts = menu.filter(item => item.catagoryFour === 'dessert');

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div>
            <div className="hero h-96 bg-fixed" style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/026/516/181/large_2x/delicious-red-velvet-cake-dark-background-with-empty-space-for-text-free-photo.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-8xl font-bold font-Times" data-aos="fade-left">DESSERTS</h1>
                    </div>
                </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-3 md:m-28'>
                {
                    desserts.map(dessertInfo => <DessertCart dessertInfo={dessertInfo} key={dessertInfo.id}></DessertCart>)
                }
            </div>
        </div>
    )
}
