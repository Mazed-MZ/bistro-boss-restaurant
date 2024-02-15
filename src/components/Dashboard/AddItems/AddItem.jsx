import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';

export default function AddItem() {

    const handleSubmit = (event) => {
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

        // console.log(newItemData);

        fetch('http://localhost:5000/newItem', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newItemData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "New Food Item is added in Menu",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    useEffect(() => {
        Aos.init({ duration: 2000 });
      }, []);

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Add Item</title>
            </Helmet>
            <div>
                <div className="pt-12">
                    <div className="md:ml-20 md:mr-20">
                        <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-out">Add New Item</h1></div>
                    </div>
                    <div className="md:ml-72 md:mr-72 mt-8">
                        <div className="divider divider-secondary italic" data-aos="zoom-in"><p>•→ What's new? ←•</p></div>
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
                                    <input type="text" placeholder="Give a name" name="title" className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Select Country Origin</span>
                                    </label>
                                    <select name="origin" className="select select-warning w-full max-w-xs">
                                        <option disabled selected>Select a country</option>
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
                                    <input type="text" placeholder="https://www." name="flag" className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                            </div>




                            <div className="md:grid md:grid-cols-3 md:gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Is it popular or not?</span>
                                    </label>
                                    <select name="catagoryOne" className="select select-warning w-full max-w-xs">
                                        <option disabled selected>Select a catagory</option>
                                        <option>popular</option>
                                        <option>non-popular</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Are you make any offer on this item?</span>
                                    </label>
                                    <select name="catagoryTwo" className="select select-warning w-full max-w-xs">
                                        <option disabled selected>Select a catagory</option>
                                        <option>offer</option>
                                        <option>no offer</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Is it specially Chef recommended?</span>
                                    </label>
                                    <select name="catagoryThree" className="select select-warning w-full max-w-xs">
                                        <option disabled selected>Select a catagory</option>
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
                                    <input type="text" placeholder="https://www." name="imageOne" required className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Foods Photo URL (size: 300 X 400 px)</span>
                                    </label>
                                    <input type="text" placeholder="https://www." name="imageTwo" required className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Foods Photo URL (size: 300 X 400 px)</span>
                                    </label>
                                    <input type="text" placeholder="https://www." name="imageThree" required className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                            </div>



                            <div className="md:grid md:grid-cols-3 md:gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Foods Photo URL (size: 300 X 400 px)</span>
                                    </label>
                                    <input type="text" placeholder="https://www." name="imageFour" required className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Foods Photo URL (size: 300 X 400 px)</span>
                                    </label>
                                    <input type="text" placeholder="https://www." name="imageFive" required className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Set a Price (currency: $)</span>
                                    </label>
                                    <input type="number" name="price" className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                            </div>



                            <div className="md:grid md:grid-cols-3 md:gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Give a description</span>
                                    </label>
                                    <textarea type="text" name="description" className="textarea textarea-warning" placeholder="Write description about this food item"></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">What type of item it is?</span>
                                    </label>
                                    <select name="catagoryFour" className="select select-warning w-full max-w-xs">
                                        <option disabled selected>Select a catagory</option>
                                        <option>dessert</option>
                                        <option>soups</option>
                                        <option>pizza</option>
                                        <option>burger</option>
                                        <option>salads</option>
                                        <option>drinks</option>
                                        <option>other</option>
                                    </select>
                                </div>
                                <div className='form-control'>
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Ingredients List</span>
                                    </label>
                                    <textarea type="text" name="ingredients" className="textarea textarea-warning" placeholder="List of ingredients about this food item"></textarea>
                                </div>
                            </div>


                            <div className="md:grid md:grid-cols-3 md:gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Add Icon URL (size: 300 X 400 px)</span>
                                    </label>
                                    <input type="text" placeholder="https://www." name="icon" required className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Add unique Product ID</span>
                                    </label>
                                    <input type="number" name="productID" required className="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                            </div>


                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Add to Menu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
