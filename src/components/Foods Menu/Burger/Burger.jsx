import BurgerCart from './BurgerCart';
import useMenu from '../../shared/AllMenuData';
import { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';

export default function Burger() {
    const [menu] = useMenu();
    const burger = menu.filter(item => item.catagoryFour === 'burger');
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div>
            <div className="hero h-96 bg-fixed" style={{ backgroundImage: 'url(https://wallpapercave.com/wp/wp2186059.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-8xl font-bold font-Times" data-aos="fade-left">BURGER</h1>
                    </div>
                </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-3 md:m-28'>
                {
                    burger.map(burgerInfo => <BurgerCart burgerInfo={burgerInfo} key={burgerInfo.id}></BurgerCart>)
                }
            </div>
        </div>
    )
}
