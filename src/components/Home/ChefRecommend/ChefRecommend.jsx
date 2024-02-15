import FoodsCart from "../../shared/FoodsCart";
import useMenu from "../../shared/AllMenuData";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

export default function ChefRecommend() {

    const [menu] = useMenu();
    const chefRecommend = menu.filter(item => item.catagoryThree === 'recommended');
    // console.log(popular);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div className="md:mt-36">
            <div className="md:ml-20 md:mr-20">
                <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-in">CHEF RECOMMENDS</h1></div>
            </div>
            <div className="md:ml-72 md:mr-72 mt-8">
                <div className="divider divider-secondary italic" data-aos="zoom-out"><p>•→ Check it out ←•</p></div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-3 md:ml-28 md:mr-28 md:mt-8'>
                {
                    chefRecommend.map(items => <FoodsCart items={items} key={items.id}></FoodsCart>)
                }
            </div>
        </div>
    )
}
