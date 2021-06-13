import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usercontext } from "../../App";

const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      history.push("/");

      if (res.status === 200) {
        toast.success("Logout Successfully");
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer position="top-center"></ToastContainer>;
    </div>
  );
};

export default Logout;
