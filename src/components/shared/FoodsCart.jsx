import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/AuthProviders';
import useCart from './useCart';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import Aos from "aos";
import 'aos/dist/aos.css';

export default function FoodsCart({ items }) {

    const { title, description, origin, imageTwo, imageThree, imageFour, imageFive, price, imageOne, productID, ingredients, _id } = items;

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

    const handleAddToCart = (items) => {
        // console.log(item)
        if (user && user.email) {
            const orderItem = { menuItemId: productID, title, description, imageOne, imageTwo, imageThree, imageFour, imageFive, origin, price, email: user.email }
            fetch('https://bistro-boss-restaurant-server.onrender.com/carts', {
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
                            title: `${orderItem.title} is Added successfully`
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
        <div>
            {/* -------->>> Desktop Version <<<<----- */}
            <div className='hidden md:block' data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                <Card sx={{ display: 'flex', bgcolor: '#330932', m: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5" sx={{ mb: 2 }} color="#ffffff">
                                {title}
                            </Typography>
                            <Typography variant="subtitle" color="#a3a0a0">{description}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography variant="h4" color="#FFA500" component="div" sx={{ pt: 3 }}>
                                    ${price}
                                </Typography>
                                <Link><Button onClick={() => handleAddToCart(items)} variant="contained" color="success" sx={{ mt: 3, ml: 5 }}>Add to Cart</Button></Link>
                                <Link to={`/allMenu/${_id}`}><Button variant="contained" sx={{ mt: 3, ml: 5 }}>See Details</Button></Link>
                            </Box>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 200, borderRadius: 10, padding: 2 }}
                        image={imageOne}
                        alt="Live from space album cover"
                    />
                </Card>
            </div>


            {/* ----->>>> Mobile Device <<<<----- */}
            <div className='md:hidden' data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                <Card sx={{ display: 'flex', bgcolor: '#330932', m: 2 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 200, borderRadius: 10, padding: 2 }}
                        image={imageOne}
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5" color="#ffffff">
                                {title}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h4" color="#FFA500" component="div" sx={{ pt: 3 }}>
                                    ${price}
                                </Typography>
                                <Link><Button onClick={() => handleAddToCart(items)} variant="contained" color="success" sx={{ mt: 3, width: 150 }}>ADD TO CART</Button></Link>
                                <Link to={`/allMenu/${_id}`}><Button variant="contained" sx={{ mt: 3, width: 150 }}>See Details</Button></Link>
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </div>
    )
}
