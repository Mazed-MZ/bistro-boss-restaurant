import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../shared/useAxiosSecure";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Rating } from "@mui/material";
import useAdmin from "../../shared/useAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';


export default function Testimonials() {

    const [axiosSecure] = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const { refetch, data: reviews = [] } = useQuery({
        queryFn: async () => {
            const res = await axiosSecure.get('/addreview')
            return res.data;
        },
    })
    // console.log(reviews);

    const handleDeleteReview = (reviewInfo) => {
        console.log(reviewInfo)
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://bistro-boss-restaurant-server.onrender.com/addreview/${reviewInfo._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Review Deleted!",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div className="mt-44">
            <div className="md:ml-20 md:mr-20">
                <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-in">TESTIMONIALS</h1></div>
            </div>
            <div className="md:ml-72 md:mr-72 mt-8">
                <div className="divider divider-secondary italic" data-aos="zoom-out"><p>•→ What Our Clients Say ←•</p></div>
            </div>
            <div>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        reviews.map(reviewInfo => <SwiperSlide key={reviewInfo.id}>
                            <div className="hero" style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/030/580/163/large_2x/colorful-food-cart-banner-generate-ai-photo.jpg)' }}>
                                <div className="hero-overlay bg-opacity-75"></div>
                                <div className="hero-content text-center text-neutral-content pt-20">
                                    <div className="max-w-md">
                                        <div className="avatar">
                                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={reviewInfo.userData.photoURL} />
                                            </div>
                                        </div>
                                        <h1 className="m-3 text-3xl font-bold">{reviewInfo.userData.displayName}</h1>
                                        <Rating name="half-rating-read" defaultValue={reviewInfo.rating} readOnly />
                                        <p className="mb-5">{reviewInfo.suggestion}</p>
                                        {
                                            isAdmin ? <button onClick={() => handleDeleteReview(reviewInfo)} className="btn btn-error">Delete Review<FontAwesomeIcon icon={faTrash} style={{ color: "#FFD43B", }} /></button> : null
                                        }

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    )
}
