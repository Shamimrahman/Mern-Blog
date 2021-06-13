import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const Home = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  /*const history = useHistory();
  const [user, setUser] = useState({
    name: "",
  });
  const getData = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUser({ ...user, name: data.name });
    } catch (error) {
      toast.error("Please Warning");
      history.push("/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  */
  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Hello!{" "}
              <span>
                {" "}
                <h1 className="text-4xl text-red-600">{user.name}</h1>
              </span>
            </h1>
            <p className="mb-8 leading-relaxed">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Button
              </button>
              <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                Button
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded shadow-2xl"
              alt="hero"
              src="https://i.pinimg.com/originals/d3/46/4a/d3464a4351fdf340ccb6bb37c281381a.gif"
            />
          </div>
        </div>
      </section>
      <ToastContainer position="top-center"></ToastContainer>
    </div>
  );
};

export default Home;
