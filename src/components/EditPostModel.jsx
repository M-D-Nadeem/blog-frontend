import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import "./EditPostModel.css";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { editBlog } from "../redux/blogsSlice";

const EditPostModal = ({ blog, isOpen, onClose, fetchBlogDetails }) => {
  const [title, setTitle] = useState(blog.title || "");
  const [content, setContent] = useState(blog.content || "");
  const [coverImage, setCoverImage] = useState(null);

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setCoverImage([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);    
    if (coverImage) formData.append("coverImage", coverImage);
    console.log(coverImage);
    
    try {
      dispatch(ShowLoading());      
      const response = await dispatch(editBlog({formData,id:blog._id}))
      console.log(response);
      
      dispatch(HideLoading());

      if (response?.payload?.success) {
        fetchBlogDetails();
        onClose();
      } 
    } catch (error) {
      console.error("Error editing post:", error);
      dispatch(HideLoading());
      toast.error("Failed to edit the post. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          ></textarea>
          <label>Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className="button-container gap-6">
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
