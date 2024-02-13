import { useQuery } from '@tanstack/react-query';
import useAuth from '../../shared/useAuth';
import useAxiosSecure from '../../shared/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

export default function PaymentHistory() {

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    console.log(payments);

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Payment History</title>
            </Helmet>
            <div className="pt-12">
                <div className="md:ml-20 md:mr-20">
                    <div className="divider divider-primary"><h1 className="text-4xl font-bold">Your Payment History</h1></div>
                </div>
                <div className="md:ml-72 md:mr-72 mt-8">
                    <div className="divider divider-secondary italic"><p>•→ Payment Details ←•</p></div>
                </div>
            </div>

            <div className="md:ml-28 md:mr-28">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-yellow-900 text-warning font-thin">
                            <tr>
                                <th>
                                    No.
                                </th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Transaction Id</th>
                                <th>Payment Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                payments.map((payment, index) =>
                                    <tr key={payment._id} className="border-b-3 border-amber-900">
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <p>{payment.email}</p>
                                        </td>
                                        <td className="font-bold">
                                            <p>${payment.price}</p>
                                        </td>
                                        <td>
                                            <p>{payment.transactionId}</p>
                                        </td>
                                        {/* <td>
                                            <p>{payment.date.toDateString()}</p>
                                        </td> */}
                                        <td>
                                            <p>{payment.status}</p>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
