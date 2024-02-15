import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../shared/useAuth';
import useAxiosSecure from '../../shared/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';

export default function Review() {

    const { user } = useAuth();

    const [axiosSecure] = useAxiosSecure();

    const { data: userData = [] } = useQuery({
        queryKey: ['userData', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userData/${user.email}`)
            return res.data;
        }
    })

    const handleReview = (event) => {
        event.preventDefault();
        const form = event.target;
        const rating = form.rating.value;
        const recipe = form.recipe.value;
        const suggestion = form.suggestion.value;
        const care = form.care.value;
        const reviewData = { rating, recipe, suggestion, care, userData, userEmail: user.email };
        // console.log(reviewData);
        Swal.fire({
            title: 'Are you confirm to add this review?',
            text: "Your review will be shown in our website",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:5000/addreview', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(reviewData)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data.insertedId)
                        if (data.insertedId) {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "Thanks to give your valuable review",
                                showConfirmButton: false,
                                timer: 1500
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
        <div>
            <div className="pt-12">
                <div className="md:ml-20 md:mr-20">
                    <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-out">GIVE A REVIEW</h1></div>
                </div>
                <div className="md:ml-72 md:mr-72 mt-8">
                    <div className="divider divider-secondary italic" data-aos="zoom-in"><p>•→ Sharing is Caring!!! ←•</p></div>
                </div>
            </div>
            <div className="bg-slate-500 md:m-16 p-8">
                <h1 className="text-4xl text-center text-white">Rate Us!</h1>
                <form onSubmit={handleReview}>
                    <div className="md:ml-96 md:pl-40 pl-24 pt-8">
                        <Stack spacing={1}>
                            <Rating name="rating" size="large" defaultValue={2.5} precision={0.5} />
                        </Stack>
                    </div>
                    <div className="form-control pt-5">
                        <label className="label">
                            <span className="label-text text-white font-bold">Which recipe you liked most?</span>
                        </label>
                        <input type="text" name="recipe" className="input input-bordered input-primary w-full" placeholder="Recipe you liked most" />
                    </div>
                    <div className='form-control pt-5'>
                        <label className="label">
                            <span className="label-text text-white font-bold">Do you have any suggestion for us?</span>
                        </label>
                        <textarea type="text" name="suggestion" className="textarea textarea-warning" placeholder="Sugggestion"></textarea>
                    </div>
                    <div className='form-control pt-5'>
                        <label className="label">
                            <span className="label-text text-white font-bold">Kindly express your care in a short way.</span>
                        </label>
                        <textarea type="text" name="care" className="textarea textarea-warning" placeholder="Review in detail"></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
