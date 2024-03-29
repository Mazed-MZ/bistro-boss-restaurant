import { faBowlFood, faCreditCard, faMoneyBill, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import useCart from "../../shared/useCart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

export default function MyCart() {

  const [cart, refetch] = useCart();
  console.log(cart);
  const totalPrice = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);

  const handleDelete = (foods) => {
    console.log(foods._id)
    Swal.fire({
      title: "Are you sure?",
      text: `${foods.title} will remove from your cart`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bistro-boss-restaurant-server.onrender.com/carts/${foods._id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.deletedCount > 0) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "This Item has been removed from cart.",
                icon: "success"
              });
            }
          })
      }
    });
  }

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <div>
        <div className="pt-12">
          <div className="md:ml-20 md:mr-20">
            <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-out">Your Cart Items</h1></div>
          </div>
          <div className="md:ml-72 md:mr-72 mt-8">
            <div className="divider divider-secondary italic" data-aos="zoom-in"><p>•→ Want to add more? ←•</p></div>
          </div>
        </div>


        {/* ------>>>>> Desktop Version Statistics <<<<<------ */}
        <div className="hidden md:block text-center pt-12 pb-12">
          <div className="stats shadow">
            <div className="stat" data-aos="fade-left">
              <div className="stat-figure text-secondary">
                <FontAwesomeIcon className="hidden md:block" icon={faBowlFood} size="2xl" fade style={{ color: "#FFD43B", }} />
              </div>
              <div className="stat-title">TOTAL ITEMS</div>
              <div className="stat-value">{cart?.length || 0}</div>
              <div className="stat-desc">We are ready to serve your foods</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FontAwesomeIcon className="hidden md:block" icon={faMoneyBill} fade size="2xl" style={{ color: "#FFD43B", }} />
              </div>
              <div className="stat-title">TOTAL PRICE</div>
              <div className="stat-value">${totalPrice}</div>
              <div className="stat-desc mt-3">Offer and discounts are comming soon</div>
            </div>

            <div className="stat" data-aos="fade-right">
              <div className="stat-figure text-secondary">
                <FontAwesomeIcon icon={faCreditCard} fade size="2xl" style={{ color: "#FFD43B", }} />
              </div>
              <div className="stat-title">MAKE PAYMENT</div>
              <div className="stat-value">
                {
                  cart.length ? <Link to="/dashboard/payment"><button className="btn btn-success btn-outline">Proceed Payment</button></Link> : <button disabled className="btn btn-success btn-outline">Proceed Payment</button>
                }
              </div>
              <div className="stat-desc mt-3">Pay first to enjoy your foods</div>
            </div>

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
                  <th>Item Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                  cart.map((foodItem, index) =>
                    <tr key={foodItem._id} className="border-b-3 border-amber-900">
                      <th>
                        {index + 1}
                      </th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={foodItem.imageOne} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                      </td>
                      <td className="font-bold">
                        {foodItem.title}
                      </td>
                      <td>
                        <div className="font-bold">${foodItem.price}</div>
                      </td>
                      <td><button onClick={() => handleDelete(foodItem)} className="btn btn-ghost"><FontAwesomeIcon icon={faTrashCan} size="2xl" style={{ color: "#ff5c5c", }} /></button></td>
                      {/* <th>
                        <Link to={`/allMenu/${foodItem.menuItemId}`}><button className="btn btn-ghost btn-xs">Details</button></Link>
                      </th> */}
                    </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* ------>>>> Mobile version statistics <<<<------ */}
        <div className="text-center md:hidden pt-12 pb-12">
          <div className="stats stats-vertical shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FontAwesomeIcon icon={faBowlFood} size="2xl" fade style={{ color: "#FFD43B", }} />
              </div>
              <div className="stat-title">TOTAL ITEMS</div>
              <div className="stat-value">{cart?.length || 0}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FontAwesomeIcon icon={faMoneyBill} fade size="2xl" style={{ color: "#FFD43B", }} />
              </div>
              <div className="stat-title">TOTAL PRICE</div>
              <div className="stat-value">${totalPrice}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FontAwesomeIcon icon={faCreditCard} fade size="2xl" style={{ color: "#FFD43B", }} />
              </div>
              <div className="stat-title">MAKE PAYMENT</div>
              <div className="stat-value">
                {
                  cart.length ? <Link to="/dashboard/payment"><button className="btn btn-success btn-outline">Proceed Payment</button></Link> : <button disabled className="btn btn-success btn-outline">Proceed Payment</button>
                }
              </div>
              <div className="stat-desc">21% more than last month</div>
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}
