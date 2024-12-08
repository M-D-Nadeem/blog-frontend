import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";
import { getAllBlogs } from "../redux/blogsSlice.js";
import toast from "react-hot-toast";
// Removed Header import here
import "./BlogList.css"

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      dispatch(ShowLoading());
      const response = await dispatch(getAllBlogs());
      dispatch(HideLoading());
      console.log(response);
      
      if (response?.payload?.success) {
        setBlogs(response?.payload?.posts);
      } 
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Failed to fetch blogs. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="absolute w-full min-h-screen">
      <div className="divider"></div>
      <div className="blogs-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <div className="p-4">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-72 h-60 object-cover rounded-lg"
            />
            </div>
            <div className="blog-content">
              <h2 className="blog-title">{blog.title}</h2>
              <div className="blog-meta">
                <span className="blog-author">{blog.user.name}</span>
                <span className="blog-date">{new Date(blog.createdAt).toLocaleString()}</span>
              </div>
              <p className="blog-summary">
                {blog.summary.length > 200
                  ? `${blog.summary.substring(0, 200)}...`
                  : blog.summary}
              </p>
              <button
                className="read-more-btn"
                onClick={() => navigate(`/blog/blogs/${blog._id}`)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
