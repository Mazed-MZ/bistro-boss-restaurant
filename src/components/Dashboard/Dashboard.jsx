import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBook, faCalendarDays, faCartShopping, faEnvelope, faHouse, faListCheck, faStar, faStore, faUser, faUserTie, faUsers, faUtensils, faWallet } from '@fortawesome/free-solid-svg-icons';
import useCart from '../shared/useCart';
import useAdmin from '../shared/useAdmin';

export default function Dashboard() {

    const [cart] = useCart();

    //TODO: load data from the server to have isAdmin based on data 
    // const isAdmin = true;
    const [isAdmin] = useAdmin();


    return (
        <div className="">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mdflex md:flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><FontAwesomeIcon icon={faBars} /></label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/disp/b7b98246110307.584824bf5f72f.gif')] bg-cover h-screen">
                        <ul className="menu p-4 w-80 min-h-full text-warning text-xl bg-black bg-opacity-55">
                            {/* Sidebar content here */}
                            <Link to="/">
                                <img className='w-full' src="https://i.ibb.co/hd3Tt9X/logo.png" alt="" />
                                <p className="font-bold mt-3 mb-10 text-xl text-center">
                                    BISTRO BOSS RESTAURANT
                                </p>
                            </Link>

                            {
                                isAdmin ?
                                    <>
                                        {/* All user excess this menu */}
                                        <div className='border-base-content border-t-4 pt-5'>
                                            <li><Link to="/dashboard/admin-home"><FontAwesomeIcon icon={faUserTie} style={{ color: "#FFD43B", }} />Admin Dashboard</Link></li>
                                            <li><Link to="/dashboard/addItem"><FontAwesomeIcon icon={faUtensils} style={{color: "#FFD43B",}} />Add Items</Link></li>
                                            <li><Link to="/dashboard/manageItem"><FontAwesomeIcon icon={faListCheck} style={{color: "#FFD43B",}} />Manage Items</Link></li>
                                            <li><Link to="/d"><FontAwesomeIcon icon={faBook} style={{color: "#FFD43B",}} />Manage Bookings</Link></li>
                                            <li><Link to="/dashboard/allusers"><FontAwesomeIcon icon={faUsers} style={{color: "#FFD43B",}} />All Users</Link></li>
                                        </div>
                                    </> :
                                    <>
                                        {/* All user excess this menu */}
                                        <div className='border-base-content border-t-4 pt-5'>
                                            <li><Link to="/dashboard/user-profile"><FontAwesomeIcon icon={faUser} style={{ color: "#FFD43B", }} />Profile</Link></li>
                                            <li><Link to="/dashboard/mycart"><FontAwesomeIcon icon={faCartShopping} style={{ color: "#FFD43B", }} />My Cart <div className="badge font-bold badge-warning gap-1">
                                                +{cart?.length || 0}
                                            </div></Link></li>
                                            <li><Link to="/"><FontAwesomeIcon icon={faCalendarDays} style={{ color: "#FFD43B", }} />Reservation</Link></li>
                                            <li><Link to="/dashboard/payment-history"><FontAwesomeIcon icon={faWallet} style={{ color: "#FFD43B", }} />Payment History</Link></li>
                                            <li><Link to="/"><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} />Add Review</Link></li>
                                        </div>
                                    </>
                            }

                            <div className='border-t-2 border-base-content'>
                                <li><Link to="/"><FontAwesomeIcon icon={faHouse} style={{ color: "#FFD43B", }} />Home</Link></li>
                                <li><Link to="/foodmenu"><FontAwesomeIcon icon={faBars} style={{ color: "#FFD43B", }} />Foods Menu</Link></li>
                                <li><Link to="/"><FontAwesomeIcon icon={faStore} style={{ color: "#FFD43B", }} />Shop</Link></li>
                                <li><Link to="/"><FontAwesomeIcon icon={faEnvelope} style={{ color: "#FFD43B", }} />Contact</Link></li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
