import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useLoaderData } from 'react-router-dom';

export default function SelectedItem() {

    const SelectedDessert = useLoaderData();
    console.log(SelectedDessert);

    return (
        <div className='mb-28 pt-16'>

            {/* ---->>>> Mobile Device <<<<---- */}
            <div className='md:hidden'>
                <div className="carousel max-w-md mt-12 space-x-4 bg-neutral rounded-box">
                    <div className="carousel-item">
                        <img src={SelectedDessert.imageTwo} className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src={SelectedDessert.imageThree} className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src={SelectedDessert.imageFour} className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src={SelectedDessert.imageFive} className="rounded-box" />
                    </div>
                </div>
            </div>



            {/* ---->>>> Desktop Version <<<<<----- */}
            <div className='text-center ml-48 mt-16 md:block hidden'>
                <div className="carousel rounded-box">
                    <div className="hover:bg-scale-110 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5">
                        <img src={SelectedDessert.imageTwo} alt="Burger" />
                    </div>
                    <div className="hover:bg-scale-110 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5">
                        <img src={SelectedDessert.imageThree} alt="Burger" />
                    </div>
                    <div className="hover:bg-scale-110 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5">
                        <img src={SelectedDessert.imageFour} alt="Burger" />
                    </div>
                    <div className="hover:bg-scale-110 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5">
                        <img src={SelectedDessert.imageFive} alt="Burger" />
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row md:ml-56 md:mr-56 m-3'>
                <div className='text-start'>
                    <h1 className='text-5xl mb-3'>{SelectedDessert.title}</h1>
                    <p>{SelectedDessert.description}</p>
                    <div className=" md:mt-5 md:p-3 border-violet-700 border-dashed rounded-xl border-2 mt-5 p-3">
                        <p className='text-xl font-bold mb-2'>Ingredients →</p>  {SelectedDessert.ingredients}
                    </div>
                </div>

                <div className="divider lg:divider-horizontal"></div>

                <div className='mt-5'>
                    <div role="tablist" className="tabs tabs-bordered">

                    <input type="radio" name="my_tabs_1" role="tab" className="text-xl tab" aria-label="Price" checked />
                        <div role="tabpanel" className="tab-content p-10">
                            <p className='text-4xl'>${SelectedDessert.price}</p>
                            <button className="mt-3 btn btn-outline btn-success"><FontAwesomeIcon icon={faCartShopping} fade size="2xl" style={{ color: "#FFD43B", }} /></button>
                        </div>

                        <input type="radio" name="my_tabs_1" role="tab" className="text-xl tab" aria-label="Origin" />
                        <div role="tabpanel" className="tab-content p-5">
                            <img src={SelectedDessert.flag} alt="" />
                            <p className='text-center pt-3'>{SelectedDessert.origin}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
