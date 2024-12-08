import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import { CreateBlog } from "../redux/blogsSlice";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userId}=useSelector((store)=>store.auth.data)  

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("userId",userId)
      images.forEach((file) => formData.append("coverImage", file));

      const response = await dispatch(CreateBlog(formData));
      console.log(response);
      dispatch(HideLoading());
      if (response?.payload?.success) {
        setTitle("");
        setContent("");
        setImages([]);
        navigate(-1);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error(error);
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="pt-10 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create a New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              rows="6"
              className="mt-1 block  w-[600px] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
