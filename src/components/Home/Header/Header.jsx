import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Header() {

    return (
        <div className='pt-20 md:pt-20 md:pl-72 md:pr-72'>
            <Carousel showArrows={true}>
                <div>
                    <img src="https://i.ibb.co/JQPZ2rT/02.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/Ms5wX9q/01.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/GMstbhj/03.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co/hgJgHBP/04.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/hW7d5vM/05.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co/pjTRTsW/06.png" />
                </div>
            </Carousel>
        </div>
    )
}
