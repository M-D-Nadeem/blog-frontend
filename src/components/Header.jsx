import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import {  logoutAccount } from "../redux/usersSlice";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";


function Header() {
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogout =async () => {
    try{
    dispatch(ShowLoading());      
    const response=await dispatch(logoutAccount())
    console.log(response);
    dispatch(HideLoading)
    if(response?.payload?.success){
    navigate("/");

    }
  } catch (error) {
    console.error("Error editing post:", error);
    dispatch(HideLoading());
    toast.error("Failed to edit the post. Please try again.");
  }
  };

  return (
    <header className="w-full pt-8">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg">
          <a href="http://localhost:5173/blog/blogList" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Logo
            </span>
          </a>

          <div className="flex items-center space-x-4">
            <a
              onClick={() => navigate("/blog/addPost")}
              className="cursor-pointer text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white"
            >
              Create new Blog
            </a>

            <div className="relative ">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="bg-white"
              >
                <FaRegUser className="w-6 h-6 text-black" />
              </button>
              {userMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <div className="px-4 py-2 text-gray-800 border-b">
                    <strong>Welcome</strong>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-white text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
