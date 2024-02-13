import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const { user, loading } = useContext(UserContext);
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,

        //====>>> Just for Token <<<====
        // queryFn: async () => {
        //     const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`, {headers: {
        //         authorization: `bearer ${token}`
        //     }})
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok')
        //     }
        //     return response.json()
        // },

        //====>>>> With AxiosSecure <<<<====
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            // console.log('res from axios', res)
            return res.data;
        },
    })
    return[cart, refetch]
}
export default useCart;