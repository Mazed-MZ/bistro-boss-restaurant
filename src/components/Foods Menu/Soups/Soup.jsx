import { useEffect } from 'react';
import useMenu from '../../shared/AllMenuData';
import SoupCart from './SoupCart';
import Aos from "aos";
import 'aos/dist/aos.css';

export default function Soup() {
    const [menu] = useMenu();
    const soups = menu.filter(item => item.catagoryFour === 'soups');

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div>
            <div className="hero h-96 bg-fixed" style={{ backgroundImage: 'url(https://images6.alphacoders.com/109/1093437.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-8xl font-bold font-Times" data-aos="fade-left">SOUPS</h1>
                    </div>
                </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-3 md:m-28'>
                {
                    soups.map(soupInfo => <SoupCart soupInfo={soupInfo} key={soupInfo.id}></SoupCart>)
                }
            </div>
        </div>
    )
}
