import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { DeleteBlog, getBlogById } from "../redux/blogsSlice";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import EditPostModal from "../components/EditPostModel";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const dispatch = useDispatch();
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.auth.data?.userId);
  const navigate = useNavigate();  // Hook for navigation

  const fetchBlogDetails = async () => {
    try {
      dispatch(ShowLoading());
      const response = await dispatch(getBlogById(id));
      dispatch(HideLoading());

      if (response?.payload?.success) {
        setBlog(response?.payload?.post);
        if (response?.payload?.post?.user?._id === currentUserId) {
          setIsAuthor(true);
        }
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Failed to fetch blog details. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const deletePost = async () => {
    try {
      dispatch(ShowLoading());
      const response = await dispatch(DeleteBlog(id))

      dispatch(HideLoading());

      if (response?.payload?.success) {
        toast.success("Post deleted successfully!");
        navigate("/blog/blogList"); // Navigate to the blog list page after successful deletion
      } 
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Failed to delete the post. Please try again.");
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-details">
      <h1 className="title">{blog.title}</h1>
      <div className="metadata">
        <span className="author">By: {blog.user.name}</span>
        <span className="date-time">
          {new Date(blog.createdAt).toLocaleString()}
        </span>
      </div>
      {isAuthor && (
        <div className="actions">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="edit-btn"
          >
            Edit
          </button>
          <button className="delete-btn" onClick={deletePost}>Delete</button>
        </div>
      )}
      <div className="image-container">
        <img src={blog.coverImage[0]} alt={blog.title} className="blog-image" />
      </div>
      <div className="content">{blog.content}</div>
      <div className="tags">
        {blog.tags.map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <EditPostModal
        blog={blog}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        fetchBlogDetails={fetchBlogDetails}
      />
    </div>
  );
};

export default BlogDetails;
