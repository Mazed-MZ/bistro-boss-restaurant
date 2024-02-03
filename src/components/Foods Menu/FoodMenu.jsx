import TodayOffer from './TodaysOffer/TodayOffer';
import Desserts from './Desserts/Desserts';
import { Helmet } from 'react-helmet-async';

export default function FoodMenu() {
    return (
        <div>
            <div className='mb-28'>
                <Helmet>
                    <title>Bistro Boss | Menu</title>
                </Helmet>
                <div className="hero h-96" style={{ backgroundImage: 'url(https://i.ibb.co/0VzhBWf/banner3.jpg)' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-lg">
                            <h1 className="mb-5 text-7xl font-bold font-Times">OUR MENU</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <TodayOffer></TodayOffer>
            </div>
            <div>
                <Desserts></Desserts>
            </div>
        </div>
    )
}
