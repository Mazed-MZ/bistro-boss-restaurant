import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext, useEffect } from 'react';
import { UserContext } from '../providers/AuthProviders';
import useCart from './useCart';
import Aos from "aos";
import 'aos/dist/aos.css';

export default function SelectedItem() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const SelectedItem = useLoaderData();
    const { title, price, imageOne, productID } = SelectedItem;
    // console.log(SelectedItem);

    const handleAddToCart = () => {
        // console.log(item)
        if (user && user.email) {
            const orderItem = { menuItemId: productID, title, imageOne, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orderItem)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        refetch();
                        Toast.fire({
                            icon: "success",
                            title: "Items Added successfully"
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: "Opps😢",
                text: "You have to login first",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div className='mb-28 pt-16'>

            {/* ---->>>> Mobile Device <<<<---- */}
            <div className='md:hidden'>
                <div className="carousel max-w-md mt-12 space-x-4 bg-neutral rounded-box" data-aos="fade-down">
                    <div className="carousel-item">
                        <img src={SelectedItem.imageTwo} className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src={SelectedItem.imageThree} className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src={SelectedItem.imageFour} className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src={SelectedItem.imageFive} className="rounded-box" />
                    </div>
                </div>
            </div>



            {/* ---->>>> Desktop Version <<<<<----- */}
            <div className='text-center ml-48 mt-16 md:block hidden'>
                <div className="carousel rounded-box">
                    <div className="hover:bg-scale-110 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5" data-aos="fade-left">
                        <img src={SelectedItem.imageTwo} alt="Burger" />
                    </div>
                    <div className="hover:bg-scale-110 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5" data-aos="fade-left">
                        <img src={SelectedItem.imageThree} alt="Burger" />
                    </div>
                    <div className="hover:bg-scale-110 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5" data-aos="fade-right">
                        <img src={SelectedItem.imageFour} alt="Burger" />
                    </div>
                    <div className="hover:bg-scale-110 carousel-item hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-110 duration-500 m-5" data-aos="fade-right">
                        <img src={SelectedItem.imageFive} alt="Burger" />
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row md:ml-56 md:mr-56 m-3'>
                <div className='text-start' data-aos="fade-down">
                    <h1 className='text-5xl mb-3'>{SelectedItem.title}</h1>
                    <p>{SelectedItem.description}</p>
                    <div className=" md:mt-5 md:p-3 border-violet-700 border-dashed rounded-xl border-2 mt-5 p-3">
                        <p className='text-xl font-bold mb-2'>Ingredients →</p>  {SelectedItem.ingredients}
                    </div>
                </div>

                <div className="divider lg:divider-horizontal"></div>

                <div className='mt-5'>
                    <div role="tablist" className="tabs tabs-bordered">

                        <input type="radio" name="my_tabs_1" role="tab" className="text-xl tab" aria-label="Price" checked />
                        <div role="tabpanel" className="tab-content p-10">
                            <p className='text-4xl'>${SelectedItem.price}</p>
                            <button onClick={() => handleAddToCart(SelectedItem)} className="mt-3 btn btn-outline btn-success"><FontAwesomeIcon icon={faCartShopping} fade size="2xl" style={{ color: "#FFD43B", }} /></button>
                        </div>

                        <input type="radio" name="my_tabs_1" role="tab" className="text-xl tab" aria-label="Origin" />
                        <div role="tabpanel" className="tab-content p-5">
                            <img src={SelectedItem.flag} alt="" />
                            <p className='text-center pt-3'>{SelectedItem.origin}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
