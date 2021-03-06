import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import { createAction } from "../../store/asyncActions/PostMethods";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Createpost = (props) => {
  const history = useHistory();
  //redux tools
  const dispatch = useDispatch();

  //take user from authRed using useSelector

  const {
    user: { _id, name },
  } = useSelector((state) => state.AuthReducer);

  console.log(_id, name);

  //error fetch from PostReducer
  const { createErrors, redirect } = useSelector((state) => state.PostReducer);

  //for image upload
  const [userImage, setuserImage] = useState("Choose Image");
  //for image preview
  const [imagePreview, setImagePreview] = useState("");
  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      console.log(e.target.files[0].name);
      setuserImage(e.target.files[0].name);

      //imagepreview code
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      //for send image to backend we need to store image in state which
      //control input
      setState({ ...state, [e.target.name]: e.target.files[0] });
    }
  };

  //for all input
  const [state, setState] = useState({
    title: "",
    description: "",
    image: "",
  });

  //for slug
  const [slug, setSlug] = useState("");
  //ekhn title a create slug korte hobe

  //slug btn for update
  const [slugBtn, setSlugBtn] = useState(false);

  const handleInput = (e) => {
    setState({ state, [e.target.name]: e.target.value });

    //mane ami tile a ja likhbo ta amar url a show korbe
    const createSlug = e.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
    //now slug er input a onchange
  };

  const slugHandle = (e) => {
    setSlug(e.target.value);
    setSlugBtn(true);
  };

  //update slug button
  const handleSlugUpdateBtn = (e) => {
    e.preventDefault();
    setSlug(slug.trim().split(" ").join("-"));
  };

  //quill
  //body part

  const [value, setValue] = useState("");

  //description

  const handleDescription = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //post info from form on submit
  const createPost = async (e) => {
    e.preventDefault();

    //jehutu pic up korbo to amader js er FormData class nite hobe

    // er age amader title,image,des destructure korte hobe

    const { title, image, description } = state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", value);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("slug", slug);
    //name and id nite hobe
    formData.append("_id", _id);
    formData.append("name", name);

    //now fire the action
    dispatch(createAction(formData));
  };

  useEffect(() => {
    if (redirect) {
      props.history.push("/blog");
    }
    //ekhn blog component a giye redirect false korbo
    //dispatch({type:Redirect_False})
  }, [redirect]);

  return (
    <div className="container">
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-x-36">
          <form onSubmit={createPost}>
            <div className="flex space-x-36">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-2/5 ">
                <div className="p-6 bg-white border-b border-gray-200">
                  <div className="mb-4">
                    <label className="text-xl text-gray-600 " htmlFor="title">
                      Title <span classNameName="text-red-500">*</span>
                    </label>
                    <br></br>
                    <input
                      type="text"
                      className="border-2 text-gray-800 border-gray-300 p-2 w-full"
                      name="title"
                      id="title"
                      required
                      onChange={handleInput}
                      value={state.title}
                    ></input>
                  </div>

                  <br></br>

                  <div className="group ">
                    <label htmlFor="body" className="text-xl text-gray-600">
                      Post body
                    </label>
                    <ReactQuill
                      theme="snow"
                      id="body"
                      type="text"
                      placeholder="Post body..."
                      value={value}
                      className="text-gray-800"
                      onChange={setValue}
                    />
                  </div>

                  <br></br>

                  <div className="mb-8">
                    <label
                      className="text-xl text-gray-600 "
                      htmlFor="description"
                    >
                      Content <span className="text-red-500">*</span>
                    </label>
                    <br></br>
                    <br></br>
                    <textarea
                      name="description"
                      id="description"
                      className="border-2 border-gray-500 w-full text-gray-800"
                      onChange={handleDescription}
                      defaultValue={state.description}
                      maxLength="150"
                    ></textarea>
                    <p className="text-black">
                      {state.description ? state.description.length : 0}
                    </p>
                  </div>

                  <div className="mb-4 text-gray-800">
                    <label htmlFor="image" className="text-xl text-gray-600">
                      {userImage}
                    </label>
                    <br></br>
                    <input
                      type="file"
                      className="border-2 border-gray-300 p-2 w-full"
                      name="image"
                      id="image"
                      onChange={fileHandle}
                    ></input>
                  </div>
                </div>
              </div>

              {/**slug  */}
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-2/5 h-2/5  ">
                <div className="p-6 bg-white border-b border-gray-200">
                  <div className="mb-4">
                    <label className="text-xl text-gray-600 " htmlFor="slug">
                      Post Url <span classNameName="text-red-500">*</span>
                    </label>
                    <br></br>
                    <input
                      type="text"
                      className="border-2 text-gray-800 border-gray-300 p-2 w-full"
                      name="slug"
                      id="slug"
                      required
                      placeholder="Post URL..."
                      onChange={slugHandle}
                      value={slug}
                    ></input>
                  </div>

                  <div className="flex p-1">
                    {slugBtn ? (
                      <button
                        role="submit"
                        className="p-3 bg-gray-500 text-white hover:bg-blue-400"
                        required
                        type="submit"
                        onClick={handleSlugUpdateBtn}
                      >
                        Update Slug
                      </button>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mb-4 text-gray-800">
                    <label
                      htmlFor="description"
                      className="text-xl text-gray-600"
                    >
                      Image Preview
                    </label>
                    <br></br>
                    {imagePreview ? <img src={imagePreview}></img> : ""}
                  </div>

                  <br></br>

                  <br></br>
                </div>

                <div className="flex p-1">
                  <button
                    role="submit"
                    className="p-3 bg-gray-500 text-white hover:bg-blue-400"
                    required
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
};

export default Createpost;
