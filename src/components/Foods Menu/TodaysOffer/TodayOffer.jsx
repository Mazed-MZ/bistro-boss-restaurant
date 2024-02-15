import { useEffect } from 'react';
import useMenu from '../../shared/AllMenuData';
import FoodsCart from '../../shared/FoodsCart';
import Aos from "aos";
import 'aos/dist/aos.css';

export default function TodayOffer() {

    const [menu] = useMenu();
    const offer = menu.filter(item => item.catagoryTwo === 'offer');
    // console.log(offer);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div className='mb-28'>
            <div className="md:ml-20 md:mr-20">
                <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-out">TODAY'S OFFER</h1></div>
            </div>
            <div className="md:ml-72 md:mr-72 mt-8">
                <div className="divider divider-secondary italic" data-aos="zoom-in"><p>•→ Don't miss ←•</p></div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-3 md:m-28'>
                {
                    offer.map(items => <FoodsCart items={items} key={items.id}></FoodsCart>)
                }
            </div>
        </div>
    )
}
