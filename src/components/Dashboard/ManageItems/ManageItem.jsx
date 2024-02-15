import { faAddressCard, faCakeCandles, faPenToSquare, faTrashCan, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../shared/useAxiosSecure";
import useMenu from "../../shared/AllMenuData";
import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function ManageItem() {

    const [menu, ,refetch] = useMenu();


    const handleDeleteItem = (menudata) => {
        Swal.fire({
            title: "Are you sure?",
            text: `${menudata.title} will be remove from menu`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/allMenu/${menudata._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Removed!",
                                text: `This ${menudata.title} is removed`,
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
                <title>Bistro Boss | Admin | Manage Item</title>
            </Helmet>
            <div>
                <div className="pt-12">
                    <div className="md:ml-20 md:mr-20">
                        <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-out">Manage All Item</h1></div>
                    </div>
                    <div className="md:ml-72 md:mr-72 mt-8">
                        <div className="divider divider-secondary italic" data-aos="zoom-in"><p>•→ Want to add more? ←•</p></div>
                    </div>
                </div>


                {/* ------>>>>> Desktop Version Statistics <<<<<------ */}
                <div className="hidden md:block text-center pt-12 pb-12">
                    <div className="stats bg-rose-950 shadow">
                        <div className="stat" data-aos="fade-left">
                            <div className="stat-title pb-3">User Icon</div>
                            <div className="stat-value text-primary pb-3"><FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#FFD43B", }} /></div>
                            <div className="stat-desc">Any user role can be changed by admin</div>
                        </div>

                        <div className="stat" data-aos="zoom-out">
                            <div className="stat-title pb-3">Admin Icon</div>
                            <div className="stat-value text-secondary pb-3"><FontAwesomeIcon size="2xl" icon={faUserShield} style={{ color: "#63E6BE", }} /></div>
                            <div className="stat-desc">Admin can change anything but the role of admin cannot be changed</div>
                        </div>

                        <div className="stat" data-aos="fade-right">
                            <div className="stat-title pb-3">
                                Total User {menu?.length}
                            </div>
                            <div className="stat-value pb-3"><div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 border-purple-500 border-2 p-2 rounded-full">
                                        <FontAwesomeIcon icon={faAddressCard} style={{ color: "#FFD43B", }} />
                                    </div>
                                </div>
                            </div></div>
                            <div className="stat-desc">Users are continously increase day by day</div>
                        </div>

                    </div>
                </div>





                {/* ------>>>> Mobile version statistics <<<<------ */}
                <div className="text-center md:hidden pt-12 pb-12">
                    <div className="stats stats-vertical shadow">
                        <div className="stat">
                            <div className="stat-title pb-3">User Icon</div>
                            <div className="stat-value text-primary pb-3"><FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#FFD43B", }} /></div>
                            <div className="stat-desc">Any user role can be changed by admin</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title pb-3">Admin Icon</div>
                            <div className="stat-value text-secondary pb-3"><FontAwesomeIcon size="2xl" icon={faUserShield} style={{ color: "#63E6BE", }} /></div>
                            <div className="stat-desc">Admin can change anything but the role of admin cannot be changed</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title pb-3">
                                Total User {menu?.length}
                            </div>
                            <div className="stat-value pb-3"><div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 border-purple-500 border-2 p-2 rounded-full">
                                        <FontAwesomeIcon icon={faAddressCard} style={{ color: "#FFD43B", }} />
                                    </div>
                                </div>
                            </div></div>
                            <div className="stat-desc">Users are continously increase day by day</div>
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
                                    <th>Item Photo</th>
                                    <th>Name</th>
                                    <th>Catagory</th>
                                    <th>Price</th>
                                    <th>Update</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    menu.map((menudata, index) =>
                                        <tr key={menudata._id} className="border-b-3 border-amber-900">
                                            <th>
                                                {index + 1}
                                            </th>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={menudata.imageOne} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-bold">
                                            <Link to={`/allMenu/${menudata._id}`}>{menudata.title}</Link>
                                            </td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={menudata.icon} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-bold">
                                                ${menudata.price}
                                            </td>
                                            <td>
                                                <Link to={`/dashboard/updateItem/${menudata._id}`}><button className="btn btn-ghost"><FontAwesomeIcon icon={faPenToSquare} size="2xl" style={{color: "#FFD43B",}} /></button></Link>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDeleteItem(menudata)} className="btn btn-ghost"><FontAwesomeIcon icon={faTrashCan} size="2xl" style={{ color: "#fb325a", }} /></button>
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
