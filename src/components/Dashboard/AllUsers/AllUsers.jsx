import { faBowlFood, faCreditCard, faMoneyBill, faTrashCan, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import Swal from "sweetalert2"
import useAxiosSecure from "../../shared/useAxiosSecure"

export default function AllUsers() {

    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryFn: async () => {
            const res = await axiosSecure.get('/user')
            return res.data;
        },
    })

    const handleMakeAdmin = (users) => {
        console.log(users);
        fetch(`http://localhost:5000/user/admin/${users._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                refetch()
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${users.name} is admin now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }


    const handleDeleteUser = (user) => {
        Swal.fire({
          title: "Are you sure?",
          text: "This user's account will be remove",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!"
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:5000/carts/${user.email}`, {
              method: 'DELETE'
            })
              .then(res => res.json())
              .then(data => {
                if (data.deletedCount > 0) {
                  refetch()
                  Swal.fire({
                    title: "Removed!",
                    text: "This user's account is removed.",
                    icon: "success"
                  });
                }
              })
          }
        });
      }


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Admin| All Users</title>
            </Helmet>
            <div>
                <div className="pt-12">
                    <div className="md:ml-20 md:mr-20">
                        <div className="divider divider-primary"><h1 className="text-4xl font-bold">Your Cart Items</h1></div>
                    </div>
                    <div className="md:ml-72 md:mr-72 mt-8">
                        <div className="divider divider-secondary italic"><p>•→ Want to add more? ←•</p></div>
                    </div>
                </div>


                {/* ------>>>>> Desktop Version Statistics <<<<<------ */}
                <div className="hidden md:block text-center pt-12 pb-12">
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FontAwesomeIcon className="hidden md:block" icon={faBowlFood} size="2xl" fade style={{ color: "#FFD43B", }} />
                            </div>
                            <div className="stat-title">TOTAL ITEMS</div>
                            <div className="stat-value">{users?.length || 0}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FontAwesomeIcon className="hidden md:block" icon={faMoneyBill} fade size="2xl" style={{ color: "#FFD43B", }} />
                            </div>
                            <div className="stat-title">TOTAL PRICE</div>
                            {/* <div className="stat-value">${totalPrice}</div> */}
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FontAwesomeIcon icon={faCreditCard} fade size="2xl" style={{ color: "#FFD43B", }} />
                            </div>
                            <div className="stat-title">MAKE PAYMENT</div>
                            <div className="stat-value"><button className="btn btn-success btn-outline">Proceed Payment</button></div>
                            <div className="stat-desc">21% more than last month</div>
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
                                    <th>User Photo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    users.map((userData, index) =>
                                        <tr key={userData._id} className="border-b-3 border-amber-900">
                                            <th>
                                                {index + 1}
                                            </th>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={userData.photoURL} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-bold">
                                                {userData.displayName}
                                            </td>
                                            <td className="font-bold">
                                                {userData.email}
                                            </td>
                                            {
                                                userData.role === 'admin' ? <td><button className="btn btn-ghost"><FontAwesomeIcon size="2xl" icon={faUserShield} style={{ color: "#63E6BE", }} /></button></td> : <td><button onClick={() => handleMakeAdmin(userData)} className="btn btn-ghost"><FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#FFD43B", }} /></button></td>
                                            }
                                            <td><button onClick={() => handleDeleteUser(userData)} className="btn btn-ghost"><FontAwesomeIcon icon={faTrashCan} size="2xl" style={{ color: "#ff5c5c", }} /></button></td>
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
                            <div className="stat-value">{users?.length || 0}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FontAwesomeIcon icon={faMoneyBill} fade size="2xl" style={{ color: "#FFD43B", }} />
                            </div>
                            <div className="stat-title">TOTAL PRICE</div>
                            {/* <div className="stat-value">${totalPrice}</div> */}
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FontAwesomeIcon icon={faCreditCard} fade size="2xl" style={{ color: "#FFD43B", }} />
                            </div>
                            <div className="stat-title">MAKE PAYMENT</div>
                            <div className="stat-value"><button className="btn btn-success btn-outline">Proceed Payment</button></div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}
