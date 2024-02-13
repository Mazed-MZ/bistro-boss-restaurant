import useMenu from '../../shared/AllMenuData';
import SoupCart from './SoupCart';

export default function Soup() {
    const [menu] = useMenu();
    const soups = menu.filter(item => item.catagoryFour === 'soups');
    return (
        <div>
            <div className="hero h-96 bg-fixed" style={{ backgroundImage: 'url(https://images6.alphacoders.com/109/1093437.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-8xl font-bold font-Times">SOUPS</h1>
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
