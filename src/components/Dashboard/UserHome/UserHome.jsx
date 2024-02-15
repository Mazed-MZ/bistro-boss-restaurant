import { useQuery } from "@tanstack/react-query";
import useAuth from "../../shared/useAuth"
import useAxiosSecure from "../../shared/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faCartShopping, faCreditCard, faList, faMoneyBill, faPhone, faStore, faWallet } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays, faStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

export default function UserHome() {

  const { user } = useAuth();
  // console.log(user);
  const [axiosSecure] = useAxiosSecure();

  const { data: userData = [] } = useQuery({
    queryKey: ['userData', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`)
      return res.data;
    }
  })

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`)
      return res.data;
    }
  })

  // const { data: reviews = [] } = useQuery({
  //   queryFn: async () => {
  //     const res = await axiosSecure.get('/addreview')
  //     return res.data;
  //   },
  // })

  // const myreviews = reviews.map(reviewInfo => reviewInfo.userData.email)

  // // console.log(myreviews);

  // const { data: myreview = [] } = useQuery({
  //   queryKey: ['myreview', user.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/myreview/${myreviews}`)
  //     return res.data;
  //   }
  // })

  const payment = payments.reduce((sum, item) => parseFloat(item.price) + sum, 0);

  // console.log(myreview);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>

      <Helmet>
        <title>Bistro Boss | User Profile</title>
      </Helmet>
      <div className="pt-12">
        <div className="md:ml-20 md:mr-20 hidden md:block">
          <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-out">{userData.displayName ? userData.displayName : 'USER PROFILE'}</h1></div>
        </div>
        <div className="md:ml-72 md:mr-72 mt-8">
          <div className="divider divider-secondary italic" data-aos="zoom-in"><p>•→ Welcome back to Bistro Boss Restaurant ←•</p></div>
        </div>
      </div>


      {/* ------>>>>> Desktop Version Statistics <<<<<------ */}
      <div className="hidden md:block text-center pt-8">
        <div className="stats shadow">
          <div className="stat" data-aos="fade-left">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon className="hidden md:block" icon={faList} size="2xl" fade style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">MENU</div>
            <div className="stat-value">Cart Length</div>
            <div className="stat-desc">We are ready to serve your foods</div>
          </div>

          <div className="stat" data-aos="fade-in">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon className="hidden md:block" icon={faStore} fade size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">SHOP</div>
            <div className="stat-value">Total price</div>
            <div className="stat-desc mt-3">Offer and discounts are comming soon</div>
          </div>

          <div className="stat" data-aos="fade-right">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faPhone} fade size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">CONTACT</div>
            <div className="stat-value">
              <button className="btn btn-success btn-outline">+8801845115245</button>
            </div>
            <div className="stat-desc mt-3">Pay first to enjoy your foods</div>
          </div>

        </div>
      </div>


      <div className='md:grid md:grid-cols-2 md:m-16 mt-12 bg-[url("https://drurybuildings.com/wp-content/uploads/2023/02/DRURY-BUILDINGS-20.jpg")] bg-cover'>
        <div className='bg-black hidden md:block bg-opacity-55 pt-28 pl-12'>
          <h1 className="md:text-4xl text-white">Your Activities →</h1>
          <div className="text-left pt-8" data-aos="fade-left">
            <p className="text-2xl pb-3 text-white">• <FontAwesomeIcon icon={faCartShopping} style={{ color: "#f7f7f7", }} /> Total Orders: {payments.length}</p>
            <p className="text-2xl pb-3 text-white">• <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#f7f7f7", }} /> Bookings: </p>
            <p className="text-2xl pb-3 text-white">• <FontAwesomeIcon icon={faWallet} style={{ color: "#f7f7f7", }} /> Total Payments: ${payment}</p>
          </div>
        </div>
        <div className='bg-black bg-opacity-75 text-center pt-12 pb-12 md:pt-36 md:pb-36'>
          <div className="avatar" data-aos="fade-right">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userData.photoURL} />
            </div>
          </div>
          <h1 className="md:text-4xl text-3xl font-bold pt-5" data-aos="fade-right">{userData.displayName ? userData.displayName : 'USER PROFILE'}</h1>
          <h1 className="md:text-2xl italic pt-5" data-aos="fade-right">{userData.email ? userData.email : 'USER E-MAIL'}</h1>
        </div>
        <div className='bg-black md:hidden bg-opacity-45 pt-20 pl-8'>
          <h1 className="text-4xl text-white">Your Activities →</h1>
          <div className="pt-8 pb-8">
            <p className="text-2xl pb-3 text-white">• <FontAwesomeIcon icon={faCartShopping} style={{ color: "#f7f7f7", }} /> Total Orders: {payments.length}</p>
            <p className="text-2xl pb-3 text-white">• <FontAwesomeIcon icon={faStar} style={{ color: "#f7f7f7", }} /> Reviews: </p>
            <p className="text-2xl pb-3 text-white">• <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#f7f7f7", }} /> Bookings: </p>
            <p className="text-2xl pb-3 text-white">• <FontAwesomeIcon icon={faWallet} style={{ color: "#f7f7f7", }} /> Total Payments: ${payment}</p>
          </div>
        </div>
      </div>


      {/* ------>>>> Mobile version statistics <<<<------ */}
      <div className="text-center md:hidden pt-12 pb-12">
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faList} size="2xl" fade style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">MENU</div>
            <div className="stat-value">cart length</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faStore} fade size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">SHOP</div>
            <div className="stat-value">$Price</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faPhone} fade size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">CONTACT</div>
            <div className="stat-value">
              <button className="btn btn-success btn-outline">+8801845115245</button>
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>

        </div>
      </div>

    </div>
  )
}
