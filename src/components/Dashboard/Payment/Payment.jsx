import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet } from 'react-helmet-async';
import CheckOutForm from './CheckOutForm';
import { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';

const stripePromise = loadStripe('pk_test_51Ofzj6HltYrJSEDhsB0l1hbhLGjmV6OiSz68aHIFRpRXd0RRELkx293WgtWpvJUHh3BJcCtQak2wRUxrD6BPTb5d00A3PPZdkr');

export default function Payment() {

    useEffect(() => {
        Aos.init({ duration: 2000 });
      }, []);

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Payment</title>
            </Helmet>
            <div>
                <div className="pt-12">
                    <div className="md:ml-20 md:mr-20">
                        <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-out">Make Payment</h1></div>
                    </div>
                    <div className="md:ml-72 md:mr-72 mt-8">
                        <div className="divider divider-secondary italic" data-aos="zoom-in"><p>•→ Pay first to eat ←•</p></div>
                    </div>
                </div>
            </div>
            <div className="bg-white m-12">
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    )
}
