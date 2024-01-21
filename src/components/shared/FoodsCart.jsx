import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FoodsCart({items}) {

    const { title, description, price, imageOne, _id } = items;

    return (
        <div>
            {/* -------->>> Desktop Version <<<<----- */}
            <div className='hidden md:block'>
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
                                <Link><Button variant="contained" color="success" sx={{ mt: 3, ml: 5 }}>Add to Cart</Button></Link>
                                {/* <Link to={`/desserts/${_id}`}><Button variant="contained" sx={{ mt: 3, ml: 5 }}>See Details</Button></Link> */}
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
            <div className='md:hidden'>
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
                                <Link><Button variant="contained" color="success" sx={{ mt: 3, width: 150 }}>ADD TO CART</Button></Link>
                                {/* <Link to={`/desserts/${_id}`}><Button variant="contained" sx={{ mt: 3, width: 150 }}>See Details</Button></Link> */}
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </div>
    )
}
