import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';


const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));


export default function OrderOnline() {
    return (
        <div className='mb-16 mt-28'>
            <div className="md:ml-20 md:mr-20">
                <div className="divider divider-primary"><h1 className="text-4xl font-bold">ORDER ONLINE</h1></div>
            </div>
            <div className="md:ml-72 md:mr-72 mt-8">
                <div className="divider divider-secondary italic"><p>•→ From 10:00am to 11:00pm ←•</p></div>
            </div>
            <div className='md:ml-72 md:mr-72 mt-8 md:grid md:grid-cols-3 md:gap-12 ml-5'>
                <div className="card w-96 h-full image-full mb-5">
                    <figure><img src="https://i.ibb.co/TrbDRtn/slide2.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <div className="mt-36 card-actions justify-center">
                            <button className="btn btn-primary btn-outline">PIZZA</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 h-full image-full mb-5">
                    <figure><img src="https://i.ibb.co/5hh7WVL/slide3.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <div className="card-actions justify-center mt-36">
                            <button className="btn btn-primary btn-outline">SOUPS</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 image-full">
                    <figure><img src="https://i.ibb.co/pJbzwMS/slide4.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <div className="card-actions justify-center mt-36">
                            <Link to="/desserts"><button className="btn btn-primary btn-outline">DESSERT</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
