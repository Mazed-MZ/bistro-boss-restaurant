import FoodsCart from '../../shared/FoodsCart';
import useMenu from '../../shared/AllMenuData';

export default function PopularItem() {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.catagoryOne === 'popular');
    // console.log(popular);

    return (
        <div className='md:mt-36'>
            <div className="md:ml-20 md:mr-20">
                <div className="divider divider-primary"><h1 className="text-4xl font-bold">POPULAR ITEMS</h1></div>
            </div>
            <div className="md:ml-72 md:mr-72 mt-8">
                <div className="divider divider-secondary italic"><p>•→ Check it out ←•</p></div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-3 md:ml-28 md:mr-28 md:mt-8'>
                {
                    popular.map(items => <FoodsCart items={items} key={items.id}></FoodsCart>)
                }
            </div>
        </div>
    )
}
