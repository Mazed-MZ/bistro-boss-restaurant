import { Box, Button, TextField } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UpdateItem() {

    const update = useLoaderData();
    // console.log(update);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const ingredients = form.ingredients.value;
        const imageOne = form.imageOne.value;
        const imageTwo = form.imageTwo.value;
        const imageThree = form.imageThree.value;
        const imageFour = form.imageFour.value;
        const imageFive = form.imageFive.value;
        const price = form.price.value;
        const origin = form.origin.value;
        const flag = form.flag.value;
        const catagoryOne = form.catagoryOne.value;
        const catagoryTwo = form.catagoryTwo.value;
        const catagoryThree = form.catagoryThree.value;
        const catagoryFour = form.catagoryFour.value;
        const icon = form.icon.value;
        const productID = form.productID.value;
        const newItemData = { title, description, ingredients, imageOne, imageTwo, imageThree, imageFour, imageFive, price, origin, flag, catagoryOne, catagoryTwo, catagoryThree, catagoryFour, icon, productID };
        console.log(newItemData);

        Swal.fire({
            title: `Are you confirm to update this ${update.title}?`,
            text: "You can change this item in menu anytime",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Upgrade it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://bistro-boss-restaurant-server.onrender.com/allMenu/${update._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newItemData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                title: `${update.title} is updated`,
                                text: `Latest ${update.catagoryFour} item is added in your menu`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <div className="pt-12">
                <div className="md:ml-20 md:mr-20">
                    <div className="divider divider-primary"><h1 className="text-4xl font-bold">Update Item</h1></div>
                </div>
                <div className="md:ml-72 md:mr-72 mt-8">
                    <div className="divider divider-secondary italic"><p>•→ Any Changes? ←•</p></div>
                </div>
            </div>
            <div className="bg-white md:ml-28 md:mr-28 mt-12">
                <div className="card shrink-0 w-full shadow-2xl bg-base-100 bg-opacity-55">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="md:grid md:grid-cols-3 md:gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Item Name</span>
                                </label>
                                <input type="text" defaultValue={update.title} name="title" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Select Country Origin</span>
                                </label>
                                <select name="origin" className="select select-warning w-full max-w-xs">
                                    <option disabled selected>{update.origin}</option>
                                    <option>China</option>
                                    <option>Bangladesh</option>
                                    <option>United States of America</option>
                                    <option>Japan</option>
                                    <option>England</option>
                                    <option>India</option>
                                    <option>Italy</option>
                                    <option>Nepal</option>
                                    <option>Australia</option>
                                    <option>New Zealand</option>
                                    <option>South Africa</option>
                                    <option>Germany</option>
                                    <option>Finland</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Flag's URL of Country Origin</span>
                                </label>
                                <input type="text" defaultValue={update.flag} name="flag" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                        </div>




                        <div className="md:grid md:grid-cols-3 md:gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Is it popular or not?</span>
                                </label>
                                <select name="catagoryOne" className="select select-warning w-full max-w-xs">
                                    <option disabled selected>{update.catagoryOne}</option>
                                    <option>popular</option>
                                    <option>non-popular</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Are you make any offer on this item?</span>
                                </label>
                                <select name="catagoryTwo" className="select select-warning w-full max-w-xs">
                                    <option disabled selected>{update.catagoryTwo}</option>
                                    <option>offer</option>
                                    <option>no offer</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Is it specially Chef recommended?</span>
                                </label>
                                <select name="catagoryThree" className="select select-warning w-full max-w-xs">
                                    <option disabled selected>{update.catagoryThree}</option>
                                    <option>recommended</option>
                                    <option>not recommended</option>
                                </select>
                            </div>
                        </div>


                        <div className="md:grid md:grid-cols-3 md:gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Foods Photo URL (size: 980 X 1200 px)</span>
                                </label>
                                <input type="text" defaultValue={update.imageOne} name="imageOne" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Foods Photo URL (size: 300 X 400 px)</span>
                                </label>
                                <input type="text" defaultValue={update.imageTwo} name="imageTwo" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Foods Photo URL (size: 300 X 400 px)</span>
                                </label>
                                <input type="text" defaultValue={update.imageThree} name="imageThree" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                        </div>



                        <div className="md:grid md:grid-cols-3 md:gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Foods Photo URL (size: 300 X 400 px)</span>
                                </label>
                                <input type="text" defaultValue={update.imageFour} name="imageFour" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Foods Photo URL (size: 300 X 400 px)</span>
                                </label>
                                <input type="text" defaultValue={update.imageFive} name="imageFive" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Set a Price (currency: $)</span>
                                </label>
                                <input type="number" defaultValue={update.price} name="price" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                        </div>



                        <div className="md:grid md:grid-cols-3 md:gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Give a description</span>
                                </label>
                                <textarea type="text" name="description" className="textarea textarea-warning" defaultValue={update.description}></textarea>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">What type of item it is?</span>
                                </label>
                                <select name="catagoryFour" className="select select-warning w-full max-w-xs">
                                    <option disabled selected>{update.catagoryFour}</option>
                                    <option>dessert</option>
                                    <option>soups</option>
                                    <option>pizza</option>
                                    <option>burger</option>
                                    <option>salads</option>
                                    <option>drinks</option>
                                </select>
                            </div>
                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text text-white font-bold">Ingredients List</span>
                                </label>
                                <textarea type="text" name="ingredients" className="textarea textarea-warning" defaultValue={update.ingredients}></textarea>
                            </div>
                        </div>


                        <div className="md:grid md:grid-cols-3 md:gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Add Icon URL (size: 300 X 400 px)</span>
                                </label>
                                <input type="text" defaultValue={update.icon} name="icon" className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold">Add unique Product ID</span>
                                </label>
                                <input type="number" defaultValue={update.productID} name="productID" required className="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update Menu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
