import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../shared/useAxiosSecure';
import useCart from '../../shared/useCart';
import useAuth from '../../shared/useAuth';
import Swal from 'sweetalert2';

export default function CheckOutForm() {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [confirmMessage, showMessage] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setError(error.message);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            showMessage(confirmError.message);
        } else {
            setTransactionId(paymentIntent.id);
        }
        // console.log(confirmMessage, paymentIntent);


        //now save the payment in the database
        const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(), // UTC date convert. use moment.Js
            cartIds: cart.map(item => item._id),
            menuItemIds: cart.map(item => item.menuItemId),
            status: 'pending'
        }

        const res = await axiosSecure.post('/payment', payment);
        // console.log('payment saved', res.data);
        refetch();
        console.log(res.data);
        if (res?.data === 'pending') {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment proceed successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className="btn-warning btn btn-square" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className="text-xl text-red-500">{error}</p>
            <p className="text-xl text-green-500">{transactionId}</p>
        </div>
    )
}
